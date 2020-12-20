<template>
    <div>
        <Player :player="player" :cheatMode='cheatMode' />
        <Inventory :slots="player.slots" :boughtItems="player.boughtItems"
            :player_id="player._id"/>
    </div>
</template>

<script>
import Inventory from './Inventory.vue'
import Player from './Player.vue'
export default {
  components: { Inventory, Player },
    name: 'SelectedPlayer',
    props: ['player', 'cheatMode']
}
</script>

<style scoped>

</style>