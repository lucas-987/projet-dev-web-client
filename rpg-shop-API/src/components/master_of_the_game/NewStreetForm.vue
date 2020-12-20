<template>
    <form>
        <h3>New Street</h3>
        <label>
            Name : 
            <input type="text" ref='name'>            
        </label>

        <button @click.prevent='createNewStreet'>
            create
        </button>

        <label v-if="error" id="errorMessage" >{{ errorMessage }}</label>
    </form>
</template>

<script>
import {Street} from '../../model';

export default {
    name: 'NewStreetForm',  
    data() {
        return {
            error: false,
            errorMessage: ''
        }
    },
    methods: {
        createNewStreet: async function() {
            let nameField = this.$refs.name;
            
            if(!this.checkFields(nameField.value)) {
                return;
            }

            let data = JSON.stringify({
                name: nameField.value,
            });
            
            let result = null;
            try {
                let response = await fetch('http://rpg.dut-info.cf/rpg/streets/create', {
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

            } catch (error) {
                console.log(error);
                this.displayErrorMessage(error.message);
                return;
            }
            
            let newStreet = Street.fromObject(result.data);

            nameField.value = '';

            this.$emit('create-street', newStreet);
        },
        checkFields: function(name) {

            if(name === undefined || name === null || name === '') {
                this.displayErrorMessage("Invalid name");
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

</style>