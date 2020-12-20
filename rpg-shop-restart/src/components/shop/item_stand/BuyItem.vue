<template>
    <span>
        <input class="search" type="number" placeholder="Enter item index" 
            :value="selectedItem.name != undefined ? selectedItem.name : ''"/>
        <button v-on:click="buyClicked" >Buy</button>
        <label v-if="error" id="errorMessage" >{{ errorMessage }}</label>
    </span>
</template>

<script>
export default {
    name: 'BuyItem',
    props: ['selectedItem', 'items', 'selectedPlayer'],
    data() {
        return {
            error: false,
            errorMessage: ''
        }
    },
    methods: {
        buyClicked: function() {
            let input = this.$el.querySelector(".search");
            let index = parseInt(input.value);

            if(index < this.items.length) {

                let item = this.items[index];

                if(this.selectedPlayer.gold >= item.price) {
                    this.selectedPlayer.buy(item);
                    input.value = '';
                    this.$emit('remove-item', {item: item});
                }
                else {
                    this.displayErrorMessage("You don't have enough gold !");
                }
            }
            else {
                this.displayErrorMessage('Invalid item index.');
            }

            return;
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
        position: absolute;
        z-index: 1;
    }

</style>