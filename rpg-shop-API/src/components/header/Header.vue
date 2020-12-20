<template>
    <header>
        <h1>{{ title }}</h1>
        <ToggleSwitch id="cheatMode" @switched="retransmitEvent('cheatMode-switched', $event)"
            title="cheat mode" valueFalse="off" valueTrue="on" />
        
        <span>
            Street : 
            <ComboBox hint="Change Street" darkTheme="true" showSelectedOption="true" 
                :options="streetsNames" :getIndex="true"
                @selected-option-changed="changeStreet" />
        </span>

        <span>
            Shop : 
            <ComboBox hint="Change Shop" darkTheme="true" showSelectedOption="true" 
                :options="shopsNames" :getIndex="true"
                @selected-option-changed="changeShop" />
        </span>

        <ComboBox hint="Add a Player to the Shop"  darkTheme="true" showSelectedOption="false" 
            :options="playersNames" :getIndex="true"
            @selected-option-changed="retransmitEvent('add-player-to-shop', $event)" />

        <ToggleSwitch id="masterOfTheGame" @switched="retransmitEvent('MOTG-switched', $event)"
           title="master of the game" valueFalse="off" valueTrue="on" />
    </header>
</template>

<script>
import ComboBox from '../others/ComboBox.vue';
import ToggleSwitch from '../others/ToggleSwitch.vue'
export default {
  name: 'Header',
  components: { ToggleSwitch, ComboBox },
  props: ['title', 'players', 'streets'],
  data() {
    return {
      selectedStreet: {shops: []},
      selectedShop: null
    }
  },
  computed: {
      playersNames: function() {
          return this.players.map(player => player.name);
      },
      streetsNames: function() {
          return this.streets.map(street => street.name);
      },
      shopsNames: function() {
          return this.selectedStreet.shops.map(shop => shop.name);
      }
  },
  methods: {
    retransmitEvent: function(name, event) {
        this.$emit(name, event);
    },
    changeStreet: function(streetIndex) {
        if(streetIndex < this.streets.length && streetIndex >= 0){
            let street = this.streets[streetIndex];
            this.selectedStreet = street;
            this.$emit('change-street', street);
        }
    },
    changeShop: function(shopIndex) {
        if(shopIndex < this.selectedStreet.shops.length && shopIndex >= 0) {
            let shop = this.selectedStreet.shops[shopIndex];
            this.selectedShop = shop;
            this.$emit('change-shop', shop);
        }
    }
  }

}
</script>

<style scoped>
    header {
        
        padding: 0.5rem;
        box-shadow: 0px 8px 10px;
        background: #E59A30;
        display: flex;
        flex-direction: row;
        column-gap: 5rem;
    }

    h1 {
        margin: 0px;
    }

</style>