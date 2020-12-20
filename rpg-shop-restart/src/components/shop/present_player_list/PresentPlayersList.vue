<template>
    <div class="root">
        <h3>Players inside :</h3>
        <div class="player" :class="(player.name == selectedPlayer.name)?'selected':''" :key='index' 
            :index="index" v-for="(player, index) in players" @click='playerClicked'>

            <span class='name'>{{ player.name }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PresentPlayersList',
    props: ['players', 'selectedPlayer'],
    methods: {
        playerClicked: function(event) {
            let player;
            if(event.target.getAttribute('class').includes('player')) {
                player = event.target;
            }
            else {
                player = event.target.closest('.player');
            }

            let clickedPlayerIndex = player.getAttribute('index');

            if(this.players[clickedPlayerIndex] === this.selectedPlayer) {
                return;
            }
            else {
                this.$emit('changePlayer', {
                    index: clickedPlayerIndex
                });
            }
        }
    }
}
</script>

<style scoped>

    .root {
        display: flex;
        flex-direction: column;
        /*justify-self: center;*/
    }

    h3 {
        text-align: center;
    }

    .player {
        margin-bottom: 1rem;
        justify-self: center;
        align-self: center;
        text-align: center;
        width: 10rem;
        box-shadow: 1px 1px 1px;
        background-color: rgb(245, 215, 140);
        cursor: pointer;
    }

    .selected {
        background-color: gainsboro;
    }

</style>