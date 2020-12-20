<template>
    <div id=root>
        <h1>Master Of The Game</h1>
        <NewPlayerForm class="form" :cheatMode="cheatMode" @create-player="retransmitEvent('create-player', $event)" />
        <NewItemForm class="form" @create-item="retransmitEvent('create-item', $event)" />
        <NewShopForm class="form" :streets="streets" 
            @create-shop="retransmitEvent('create-shop', $event)" />
        <AddItemToShop class="form" :streets="streets" :items="items"
            @update-shop="retransmitEvent('update-shop', $event)" />
        <NewStreetForm class="form" 
            @create-street="retransmitEvent('create-street', $event)" />    
    </div>
</template>

<script>
import AddItemToShop from './AddItemToShop.vue';
import NewItemForm from './NewItemForm.vue';
import NewPlayerForm from './NewPlayerForm.vue';
import NewShopForm from './NewShopForm.vue';
import NewStreetForm from './NewStreetForm.vue';

export default {
    name: 'MasterOfTheGame',
    components: {
        NewPlayerForm,
        NewItemForm,
        NewShopForm,
        AddItemToShop,
        NewStreetForm
    },
    props: ['cheatMode', 'streets', 'items'],
    methods: {
        retransmitEvent: function(name, event) {
            this.$emit(name, event);
        }
    }
}
</script>

<style scoped>

   
    #root {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr; 
        row-gap: 5em;
    }

    #root > h1 {
        grid-column: 1/4;
        justify-self: center;
    }
    
    .form {
        justify-self: center;
    }

</style>