<template>
    <form>
        <h3>Add an item to a shop</h3>

        <label>
            Street : 
            <ComboBox hint="Select Street" :options="streetsNames" 
                showSelectedOption="true" :getIndex="true"
                darkTheme="false" ref="street" 
                @selected-option-changed="streetChanged" />
        </label>

        <label>
            Shop : 
            <ComboBox hint="Select Shop" :options="shopsNames" 
                showSelectedOption="true" :getIndex="true"
                darkTheme="false" ref="shop" 
                @selected-option-changed="shopChanged" />
        </label>

        <label>
            Item : 
            <ComboBox hint="Select Item" :options="itemsNames" 
                showSelectedOption="true" :getIndex="true"
                darkTheme="false" ref="item" 
                @selected-option-changed="itemChanged" />
        </label>

        <button @click.prevent="addItem">
            create
        </button>

        <label v-if="error" id="errorMessage" >{{ errorMessage }}</label>
    </form>
</template>

<script>
import ComboBox from '../others/ComboBox.vue';

export default {
    components: { ComboBox },
    name: 'AddItemToShop',
    props: ['streets', 'items'],
    data() {
        return{
            selectedStreet: {shops: []},
            selectedShop: '',
            selectedItem: '',
            error: false,
            errorMessage: ''
        }
    },
    computed: {
        streetsNames: function() {
            return this.streets.map(street => street.name);
        },
        shopsNames: function() {
            return this.selectedStreet.shops.map(shop => shop.name);
        },
        itemsNames: function() {
            return this.items.map(item => item.name);
        } 
    },
    methods: {
        addItem: async function() {

            if(! this.checkFields()) {
                return;
            }

            let result = null;
            let data = JSON.stringify({
                    idShop: this.selectedShop._id,
                    idItem: this.selectedItem._id,
            });

            try{
                let response = await fetch('http://rpg.dut-info.cf/rpg/shops/additem', {
                    method: 'PUT',
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
                
            this.$emit('update-shop', {
                shop: this.selectedShop,
                street: this.selectedStreet,
                item: this.selectedItem
            });

        },

        streetChanged: function(streetIndex) {
            if(streetIndex < this.streets.length && streetIndex >= 0) {
                let street = this.streets[streetIndex];

                this.selectedStreet = street;
            }
            else {
                this.displayErrorMessage('Wrong selected street index.');
            }
        },
        shopChanged: function(shopIndex) {
            if(shopIndex < this.selectedStreet.shops.length && shopIndex >= 0) {
                let shop = this.selectedStreet.shops[shopIndex];

                this.selectedShop = shop;
            }
            else {
                this.displayErrorMessage('Wrong selected shop index.');
            }
        },
        itemChanged: function(itemIndex) {
            if(itemIndex < this.items.length && itemIndex >= 0) {
                let item = this.items[itemIndex];

                this.selectedItem = item;
            }
            else {
                this.displayErrorMessage('Wrong selected item index.');
            }
        },


        checkFields: function() {
            if(this.selectedStreet._id == undefined || !this.streets.includes(this.selectedStreet)) {
                this.displayErrorMessage("Unvalid street.");
                return false;
            }

            if(this.selectedShop._id == undefined || !this.selectedStreet.shops.includes(this.selectedShop)) {
                this.displayErrorMessage("Unvalid shop.");
                return false;
            }

            if(this.selectedItem._id == undefined || !this.items.includes(this.selectedItem)) {
                this.displayErrorMessage("Unvalid item.");
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