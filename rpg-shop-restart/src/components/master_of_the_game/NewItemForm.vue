<template>
    <form>
        <h3>New Item</h3>
        <label >
            Name : 
            <input type="text" ref="name">
        </label>
        
        <label>
            Category : 
            <ComboBox hint="Select Category" :options="itemCats" showSelectedOption="true"
                darkTheme="false" ref="category" @selected-option-changed="handleComboboxUpdate" />
        </label>
        
        <label>
            Price : 
            <input type="number" ref="price">
        </label>

        <label>
            Effect : 
            <input type="text" ref="effect">
        </label>

        <button @click.prevent="createNewItem">
            create
        </button>

        <label v-if="error" id="errorMessage" >{{ errorMessage }}</label>
    </form>
</template>

<script>
import {Item, itemCats} from '../../model';
import ComboBox from '../others/ComboBox.vue';

export default {
    components: { ComboBox },
    name: 'NewItemForm',
    data() {
        return {
            itemCats: itemCats,
            selectedCategory: '',
            error: false,
            errorMessage: ''
        }
    },
    methods: {
        createNewItem: function() {
            let nameField = this.$refs.name;
            let priceField = this.$refs.price;
            let effectField = this.$refs.effect;

            if(! this.checkFields(nameField.value, this.selectedCategory, priceField.value, effectField.value)) {
                return;
            }

            let newItem = new Item(new Date().getTime(), nameField.value, this.selectedCategory, priceField.value, effectField.value);

            nameField.value = '';
            priceField.value = '';
            effectField.value = '';
            
            this.$emit('create-item', newItem);
        },
        checkFields: function(name, category, price, effect) {
            if(!Number.isInteger(parseInt(price))) {
                this.displayErrorMessage("Unvalid price.");
                return false;
            }

            if(price < 0) {
                this.displayErrorMessage("Price can't be a negatif number.");
                return false;
            }

            if(name === undefined || name === null || name === '') {
                this.displayErrorMessage("Unvalid name");
                return false;
            }

            if( !this.itemCats.includes(category) || category === '') {
                this.displayErrorMessage("Unvalid category");
                return false;
            }

            let regexEffect = /^[ASL][+-]\d{1,3}$/;
            if(effect.match(regexEffect) === null) {
                this.displayErrorMessage("Unvalid effect : needs to be A,S or L + or - a number between 0 and 999.");
                return false;
            }

            return true;
        },
        handleComboboxUpdate: function(newSelectedCategory) {
            this.selectedCategory = newSelectedCategory;
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