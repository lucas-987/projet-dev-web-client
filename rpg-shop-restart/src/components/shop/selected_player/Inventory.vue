<template>
    <div>
        <div class='slot' :key="slot.id" v-for="slot in slots">
            <h4>{{ slot.name }}</h4>
            <div class="itemContainer" :id="slot.id"
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
    props: ['slots', 'boughtItems'],
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
        drop: function(event) {
            let newContainer;
            if (event.target.getAttribute('class') === 'itemContainer') {
                newContainer = event.target;
            }
            else {
                newContainer = event.target.closest('.itemContainer');
            }
            
            let destId = newContainer.getAttribute('id');
            if(! (this.checkIdIsValid(this.sourceContainerId) && this.checkIdIsValid(destId))) {
                return;
            }

            let destIsBoughtItems = destId === 'boughtItems';
            if(!destIsBoughtItems) {
                let item = this.getItemFromSource();
                if(! this.checkDestCanAddItem(item, destId)){
                    return;
                }
            }

            this.addItemToDest(destId, this.getItemFromSource());
            this.removeItemFromSource();
        },

        removeItemFromSource: function() {
            if(this.sourceContainerId === 'boughtItems') {
                this.boughtItems.splice(this.dragedItemIndex, 1);
            }
            else {
                this.slots[this.sourceContainerId - 1].items.splice(this.dragedItemIndex,1);
            }
        },
        addItemToDest: function(destId, item) {
            if(destId === 'boughtItems') {
                this.boughtItems.push(item);
            }
            else {
                this.slots[destId - 1].items.push(item);
            }
        },

        getItemFromSource: function() {
            if(this.sourceContainerId === 'boughtItems') {
                return this.boughtItems[this.dragedItemIndex];
            }
            else {
                return this.slots[this.sourceContainerId -1].items[this.dragedItemIndex];
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
        getSlotById: function(id) {
            for(const slot of this.slots) {
                if(slot.id == id) {
                    return slot;
                }
            }
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
        checkIdIsValid: function(id) {
            for(let slot of this.slots) {
                if(slot.id == id) {
                    return true;
                }
            }
            if(id === 'boughtItems') {
                return true;
            }
            
            return false;
        }
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