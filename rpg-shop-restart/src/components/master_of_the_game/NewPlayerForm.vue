<template>
    <form>
        <h3>New Player</h3>
        <label>
            Name : 
            <input type="text" ref='name'>            
        </label>
        <label>
            Gold : 
            <input type="number" ref='gold' step="any">
        </label>

        <label v-if="cheatMode == true">
            Level : 
            <input type="number" ref='level' value='1'>
        </label>

        <label v-if="cheatMode == true">
            Strength : 
            <input type="number" ref='strength' value='20'>
        </label>

        <label v-if="cheatMode == true">
            Vitality : 
            <input type="number" ref='vitality' value='50'>
        </label>

        <label v-if="cheatMode == true">
            Life : 
            <input type="number" ref='life' value='50'>
        </label>

        <label v-if="cheatMode == true">
            Armor : 
            <input type="number" ref='armor' value='0'>
        </label>

        <button @click.prevent='createNewPlayer'>
            create
        </button>

        <label v-if="error" id="errorMessage" >{{ errorMessage }}</label>
    </form>
</template>

<script>
import {Perso} from '../../model';

export default {
    name: 'NewPlayerForm',
    props: ['cheatMode'],
    data() {
        return {
            error: false,
            errorMessage: ''
        }
    },
    methods: {
        createNewPlayer: function() {
            let nameField = this.$refs.name;
            let goldField =this.$refs.gold;

            let levelValue = this.$refs.level != undefined ? this.$refs.level.value : {value: 1};
            let strengthValue = this.$refs.strength != undefined ? this.$refs.strength.value : {value: 20};
            let vitalityValue = this.$refs.vitality != undefined ? this.$refs.vitality.value : {value: 50};
            let lifeValue = this.$refs.life != undefined ? this.$refs.life.value : {value: 50};
            let armorValue = this.$refs.armor != undefined ? this.$refs.armor.value : {value: 0};
            
            if(!this.checkFields(nameField.value, goldField.value, levelValue, strengthValue, vitalityValue, lifeValue, armorValue)) {
                return;
            }

            let newPlayer = new Perso(nameField.value, 1);
            newPlayer.gold = parseInt(goldField.value);

            nameField.value = '';
            goldField.value = '';

            this.$emit('create-player', newPlayer);
        },
        checkFields: function(name, gold, level, strength, vitality, life, armor) {
            if(!Number.isInteger(parseInt(gold))) {
                this.displayErrorMessage("Invalid gold amount.");
                return false;
            }

            if(gold < 0) {
                this.displayErrorMessage("Amount of gold can't be negatif.");
                return false;
            }

            if(name === undefined || name === null || name === '') {
                this.displayErrorMessage("Invalid name");
                return false;
            }

            if(!Number.isInteger(parseInt(level))) {
                this.displayErrorMessage("Invalid level.");
                return false;
            }

            if(!Number.isInteger(parseInt(strength))) {
                this.displayErrorMessage("Invalid strength.");
                return false;
            }

            if(!Number.isInteger(parseInt(vitality))) {
                this.displayErrorMessage("Invalid vitality.");
                return false;
            }

            if(!Number.isInteger(parseInt(life))) {
                this.displayErrorMessage("Invalid life.");
                return false;
            }

            if(!Number.isInteger(parseInt(armor))) {
                this.displayErrorMessage("Invalid armor.");
                return false;
            }

            return true;
        },

        displayErrorMessage: function(message) {
            this.errorMessage = message;
            this.error = true;

            setTimeout(this.eraseErrorMessage, 3000);
        },
        eraseErrorMessage: function() {
            this.error = false;
            this.errorMessage = '';
        }
    }
}
</script>

<style scoped>
    form {
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
    }

    form > * {
        flex: auto;
        align-self: center;
    }

    h3 {
        margin: 0;
    }

    #errorMessage {
        text-align: center;
        padding: 3px 5px;
        margin-left: 10px;
        border: 4px ridge red;
        border-radius: 6px;
        box-shadow: 2px 4px 5px;
        min-width: 1px;
        box-sizing: border-box;
        background-color: #FFFFFF;
    }
</style>