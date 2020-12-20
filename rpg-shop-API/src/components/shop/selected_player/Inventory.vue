<template>
    <div>
        <div class='slot' :key="slot._id" v-for="slot in slots">
            <h4>{{ slot.name }}</h4>
            <div class="itemContainer" :id="slot._id"
                @dragover.prevent @drop.prevent="drop">
                <Item class="item" :item="item" @dragstart="dragStart" draggable="true"
                    :index="index" :key="index" v-for="(item, index) in slot.items" />
            </div>
        </div>
        <div class='slot'>
            <h4>Bought Items</h4>
            <div class="itemContainer" id="boughtItems"
                @dragover.prevent @drop.prevent="drop">
                <Item :index="index" :key="index" v-for="(item, index) in boughtItems"
                    :item="item" class="item" @dragstart="dragStart" draggable="true" />
            </div>
        </div>
    </div>
</template>

<script>
import Item from '../Item.vue';
import {itemLimits} from '../../../model';

export default {
    components: {Item},
    name: 'Inventory',
    props: ['slots', 'boughtItems', 'player_id'],
    data() {
        return {
            dragedItemIndex: null,
            sourceContainerId: null
        }
    },
    methods: {
        dragStart: function(event) {
            this.dragedItemIndex = parseInt(event.target.getAttribute('index'));
            this.sourceContainerId = event.target.parentElement.getAttribute('id');
        },
        drop: async function(event) {
            let destId;
            if (event.target.getAttribute('class') === 'itemContainer') {
                destId = event.target.getAttribute('id');
            }
            else {
                destId = event.target.closest('.itemContainer').getAttribute('id');
            }
            
            if(! (this.checkIdIsValid(this.sourceContainerId) && this.checkIdIsValid(destId))) {
                return;
            }

            let destIsBoughtItems = destId === 'boughtItems';
            let sourceIsBoughtItems = this.sourceContainerId === 'boughtItems';

            if(!destIsBoughtItems) {
                let item = this.getItemFromSource();
                if(! this.checkDestCanAddItem(item, destId)){
                    return;
                }
            }

            if(!destIsBoughtItems || !sourceIsBoughtItems) {
                if(!sourceIsBoughtItems) {
                    let sourceUpdated = await this.updateSource();
                    if(!sourceUpdated) {
                        return;
                    }
                }

                if(!destIsBoughtItems) {
                    let destUpdated = await this.updateDest(destId);
                    if(!destUpdated) {
                        return;
                    }
                }
            }

            this.addItemToDest(destId, this.getItemFromSource());
            this.removeItemFromSource();
        },

        updateDest: async function(destId) {
            let slotItemsCopy = this.getSlotById(destId).items.slice();
            slotItemsCopy.push(this.getItemFromSource());

            let data = JSON.stringify({
                id: this.player_id,
                slotName: this.getSlotName(destId),
                items: slotItemsCopy.filter(item => item != null)
            });

            let result = null;
            try {
                let response = await fetch('http://rpg.dut-info.cf/rpg/persos/updateslot', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: data
                });

                result = await response.json();

                if(result.err == 1) {
                    return false;
                }

                return true;
                        
            } catch (error) {
                return false;
            }
        },
        updateSource: async function() {
            let itemToRemoveId = this.getSlotById(this.sourceContainerId).items[this.dragedItemIndex]._id;

            let slotItemsCopy = this.getSlotById(this.sourceContainerId).items.filter(
                item => item._id != itemToRemoveId
            );

            let data = JSON.stringify({
                id: this.player_id,
                slotName: this.getSlotName(this.sourceContainerId),
                items: slotItemsCopy.filter(item => item != null)
            });

            let result = null;
            try {
                let response = await fetch('http://rpg.dut-info.cf/rpg/persos/updateslot', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: data
                });

                result = await response.json();

                if(result.err == 1) {
                    return false;
                }
                        
            } catch (error) {
                return false;
            }

            return true;
        }, 
        
        removeItemFromSource: function() {
            if(this.sourceContainerId === 'boughtItems') {
                this.boughtItems.splice(this.dragedItemIndex, 1);
            }
            else {
                this.getSlotById(this.sourceContainerId).items.splice(this.dragedItemIndex,1);
            }
        },
        addItemToDest: function(destId, item) {
            if(destId === 'boughtItems') {
                this.boughtItems.push(item);
            }
            else {
                this.getSlotById(destId).items.push(item);
            }
        },

        getSlotById: function(id) {
            for(const slot of this.slots) {
                if(slot._id == id) {
                    return slot;
                }
            }
        },
        getSlotName: function(slotId) {
            if(slotId === 'boughtItems') {
                return;
            }
            else {
                return this.getSlotById(slotId).name;
            }
        },
        getItemFromSource: function() {
            if(this.sourceContainerId === 'boughtItems') {
                return this.boughtItems[this.dragedItemIndex];
            }
            else {
                return this.getSlotById(this.sourceContainerId).items[this.dragedItemIndex];
            }
        },

        checkIdIsValid: function(id) {
            for(let slot of this.slots) {
                if(slot._id == id) {
                    return true;
                }
            }
            if(id === 'boughtItems') {
                return true;
            }
            
            return false;
        },
        checkDestCanAddItem: function(item, containerId) {
            if(containerId == 'boughtItems') {
                return true;
            }
            else {
                for(const itemLimit of itemLimits) {
                    if(itemLimit.slot == this.getSlotName(containerId)) {
                        if(itemLimit.types.includes(item.type) && 
                            this.getSlotById(containerId).items.length < itemLimit.limit){
                            return true;
                        }
                        else{
                            return false;
                        }
                    }
                }
            }

            return false;
        },
    }
}
</script>

<style scoped>

    .itemContainer {
        background-color: rgb(160, 96, 0);
        display: grid;
        margin-top: 10px;
        padding-bottom: 10px;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        min-height: 2em;
        column-gap: 1em;
    }

    .item {
        box-shadow: 2px 2px 5px;
        padding: 0.25rem;
        text-align: center;
        min-width: 1px;
        max-width: 10rem;
        box-sizing: border-box;
        margin-top: 0.5em;
        background-color: white;
        cursor: pointer;
    }

</style>