<template>
    <div id="shoproot">
        <h1>{{ shopName }}</h1>
        <ItemStand :items="items" :selectedPlayer="selectedPlayer"
            @remove-item='removeItem' />
        <SelectedPlayer :player="selectedPlayer" :cheatMode="cheatMode" />
        <PresentPlayersList :players="players" :selectedPlayer="selectedPlayer"
            @changePlayer="changePlayer" />
    </div>
</template>

<script>
import ItemStand from './item_stand/ItemStand.vue'
import SelectedPlayer from './selected_player/SelectedPlayer.vue'
import PresentPlayersList from './present_player_list/PresentPlayersList'

export default {
    components: { ItemStand, SelectedPlayer, PresentPlayersList },
    name: 'Shop',
    props: ['shopName', 'items', 'players', 'cheatMode'],
    data() {
        return {
            selectedPlayer: this.players[0]
        }
    },
    methods: {
        changePlayer: function(event) {
            this.selectedPlayer = this.players[event.index];
        },
        removeItem: function(event) {
            this.items = this.items.filter(item => item != event.item);
        }
    }
}
</script>

<style scoped>
    #shoproot {
        display: grid;
        grid-template-columns: 2fr 2fr 1fr;
        margin-left: 2rem;
        margin-right: 2rem;
    }

    #shoproot > h1 {
        grid-column: 1/6;
        justify-self: center;
    }

</style>