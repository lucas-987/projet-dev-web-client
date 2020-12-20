<template>
    <div>
        <h2>Items</h2>
        <ItemList :items="items" />
        <BuyItem :selectedPlayer="selectedPlayer" :items="items"
            :selectedItem="selectedItem" @remove-item="retransmitEvent('remove-item', $event)" />
    </div>
</template>

<script>
import BuyItem from './BuyItem.vue'
import ItemList from './ItemList.vue'

export default {
    components: { ItemList, BuyItem },
    name: 'ItemStand',
    props: ['items', 'selectedPlayer'],
    data() {
        return {
            selectedItem: ''
        }
    },
    methods: {
        retransmitEvent: function(name, event) {
            this.$emit(name, event);
        }
    }
}
</script>

<style scoped>

</style>