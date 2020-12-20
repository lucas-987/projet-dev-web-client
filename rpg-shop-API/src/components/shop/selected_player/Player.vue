<template>
    <div>
        <h3>{{ player.name }}</h3>
        <form v-if="cheatMode == true">
            <label>
                Level : 
                <input type="number" :value="player.level" ref="level">,
            </label>

            <label>
                Gold : 
                <input type="number" :value="player.gold" ref="gold">,
            </label>

            <label>
                Strength : 
                <input type="number" :value="player.strength" ref="strength" >
            </label>

            <button @click.prevent="updatePlayer">
                Apply changes
            </button>
        </form>

        <span v-else>
            <span class="playerStat">
                Level : {{ player.level }},
            </span>

            <span class="playerStat">
                Gold : {{ player.gold }},
            </span>

            <span class="playerStat">
                Strength : {{ player.strength }}
                <img v-if="player.strength > 9000" src="https://media.tenor.com/images/216794781f5cde97f9a2a4fd08e01c35/tenor.gif" alt="awesome vegeta gif">
            </span>
        </span>
    </div>
</template>

<script>
export default {
    name: 'Player',
    props: ['player', 'cheatMode'],
    methods: {
        updatePlayer: function() {
            let newLevel = this.$refs.level.value;
            let newGold = this.$refs.gold.value;
            let newStrength = this.$refs.strength.value;

            if(! this.checkFields(newLevel, newGold, newStrength)) {
                return false;
            }

            //We can update directly the player since it is a pointer
            //to the player instance from the model in the App component
            this.player.level = newLevel;
            this.player.gold = newGold;
            this.player.strength = newStrength;
        },
        checkFields: function(level, gold, strength) {
            if(! (Number.isInteger(parseInt(gold)) 
                && Number.isInteger(parseInt(level)) 
                && Number.isInteger(parseInt(strength)) ) ) {

                return false;
            }

            if(gold < 0 || level < 0 || strength < 0) {
                return false;
            }

            return true;
        },
        displayError: function() {

        }
    }
}
</script>

<style scoped>

    form {
        display: flex;
        flex-direction: column;
    }

    button {
        max-width: 50%;
    }

</style>