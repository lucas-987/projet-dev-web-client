<template>
    <form>
        <h3>New Shop</h3>

        <label>
            Street : 
            <ComboBox hint="Select Street" :options="streetsNames" 
                showSelectedOption="true" :getIndex="true"
                darkTheme="false" ref="street" 
                @selected-option-changed="handleComboboxUpdate" />
        </label>

        <label >
            Name : 
            <input type="text" ref="name">
        </label>

        <label >
            Type : 
            <input type="text" ref="type">
        </label>

        <button @click.prevent="createNewShop">
            create
        </button>

        <label v-if="error" id="errorMessage" >{{ errorMessage }}</label>
    </form>
</template>

<script>
import ComboBox from '../others/ComboBox.vue'

import {Shop} from '../../model';

export default {
    components: { ComboBox },
    name: 'NewShopForm',
    props: ['streets'],
    data() {
        return{
            selectedStreet: '',
            error: false,
            errorMessage: ''
        }
    },
    computed: {
        streetsNames: function() {
            return this.streets.map(street => street.name);
        }, 
    },
    methods: {
        createNewShop: async function() {
            let nameField = this.$refs.name;
            let typeField = this.$refs.type;

            if(! this.checkFields(nameField.value, typeField.value)) {
                return;
            }

            let result = null;
            let data = JSON.stringify({
                        id: this.selectedStreet._id,
                        name: nameField.value,
                        type: typeField.value,
            });

            try{
                let response = await fetch('http://rpg.dut-info.cf/rpg/shops/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: data
                });
    
                result = await response.json();

                if(result.err == 1) {
                    this.displayErrorMessage(result.data);
                    return;
                }


            }catch(error) {
                this.displayErrorMessage(error.message);
                return;
            }

            let newShop = Shop.fromObject(result.data);

            nameField.value = '';
            typeField.value = '';
                
            this.$emit('create-shop', {
                shop: newShop,
                street: this.selectedStreet
            });

        },

        handleComboboxUpdate: function(streetIndex) {
            if(streetIndex < this.streets.length && streetIndex >= 0) {
                let street = this.streets[streetIndex];

                this.selectedStreet = street;
            }
            else {
                this.displayErrorMessage('Wrong selected street index.');
            }
        },

        checkFields: function(name, type) {
            if(name === undefined || name === null || name === '') {
                this.displayErrorMessage("Unvalid name.");
                return false;
            }

            if(type === undefined || type === null || type === '') {
                this.displayErrorMessage("Unvalid type.");
                return false;
            }

            if(this.selectedStreet._id == undefined || !this.streets.includes(this.selectedStreet)) {
                this.displayErrorMessage("Unvalid street.");
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