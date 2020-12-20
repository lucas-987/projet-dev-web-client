<template>
    <div id=root>
        <h1>Master Of The Game</h1>
        <NewPlayerForm class="form" :cheatMode="cheatMode"
             @create-player="retransmitEvent('create-player', $event)" />
        <NewItemForm class="form" @create-item="retransmitEvent('create-item', $event)" />
    </div>
</template>

<script>
import NewItemForm from './NewItemForm.vue';
import NewPlayerForm from './NewPlayerForm.vue';

export default {
    name: 'MasterOfTheGame',
    props: ['cheatMode'],
    components: {
        NewPlayerForm,
        NewItemForm
    },
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
        grid-template-columns: 1fr 1fr; 
    }

    #root > h1 {
        grid-column: 1/3;
        justify-self: center;
    }
    
    .form {
        justify-self: center;
    }

</style>