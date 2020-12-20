<template>
  <div id="app">
    <Header title="RPG shop" :players="players" :streets="streets"
      @MOTG-switched="handleMOTGswitched" @cheatMode-switched="handleCheatModeSwitched" 
      @change-shop="changeShop" @change-street="changeStreet"
      @add-player-to-shop="addPlayerToShop" />

    <Shop v-if="!masterOfTheGame" :shop="currentShop"  
      :players="generateShopPlayers()" :cheatMode="cheatMode" />

    <MasterOfTheGame v-else @create-player="addNewPlayer" 
      @create-item="addNewItem" @create-street="addNewStreet"
      @create-shop="addNewShop" @update-shop="updateShop" 
      :cheatMode="cheatMode" :streets="streets" :items="items" />
  </div>
</template>

<script>
import Header from './components/header/Header.vue'
import MasterOfTheGame from './components/master_of_the_game/MasterOfTheGame.vue'
import Shop from './components/shop/Shop.vue'

//importing items and players from model
import {nbMaxItems, nbMaxPlayers, Perso, Item, Street} from './model.js'

//importing some functions
import utilitaryFunctions from './utilitaryFunctions'

export default {
  name: 'App',
  components: {
    Header,
    Shop,
    MasterOfTheGame
  },
  data() {
    return {
      players: [],
      items: [],
      streets: [],
      currentStreet: null,
      currentShop: null,
      masterOfTheGame: false,
      cheatMode: false,
      generateNewShop: true,
      cachedShopPlayers: [],
      cachedShopItems: []
    }
  },
  async created() {
    let itemsResponse = await fetch('http://rpg.dut-info.cf/rpg/items/get');
    this.items = await itemsResponse.json();
    this.items = this.items.map(item => {
      return Item.fromObject(item);
    });

    let playersResponse = await fetch('http://rpg.dut-info.cf/rpg/persos/get');
    this.players = await playersResponse.json();
    this.players = this.players.map(player => {
      return Perso.fromObject(player);
    });

    let streetsResponse = await fetch('http://rpg.dut-info.cf/rpg/streets/get');
    this.streets = await streetsResponse.json();
    this.streets = this.streets.map(street => {
      return Street.fromObject(street);
    });
  },
  methods: {
    generateShopStock() {
      if(this.generateNewShop == true) {
        let itemsCopy = this.items.slice();
  
        //shuffling itemsCopy
        utilitaryFunctions.shuffleArray(itemsCopy);
  
        let shopItems = itemsCopy.slice(0,nbMaxItems);
        this.cachedShopItems = shopItems;
        return shopItems;
      }
      return this.cachedShopItems;
    },

    generateShopPlayers() {
      if(this.generateNewShop == true) {
        let playersCopy = this.players.slice();
  
        //shuffling playersCopy
        utilitaryFunctions.shuffleArray(playersCopy);
  
        let shopPlayers = playersCopy.slice(0, utilitaryFunctions.randInt(nbMaxPlayers));
        this.cachedShopPlayers = shopPlayers;
        return shopPlayers;
      }

      return this.cachedShopPlayers;
    },

    handleMOTGswitched: function(event) {
      this.generateNewShop = false;
      this.masterOfTheGame = event.status;
    },
    handleCheatModeSwitched: function(event) {
      this.generateNewShop = false;
      this.cheatMode = event.status;
    },

    addNewPlayer: function(player) {
      this.players.push(player);
    },
    addNewItem: function(item) {
      this.items.push(item);
    },
    addNewStreet: function(street) {
      this.streets.push(street);
    },
    addNewShop: function(event) {
      for(let streetIterator of this.streets) {
        if(streetIterator === event.street) {
          streetIterator.shops.push(event.shop);
          return;
        }
      }
    },
    updateShop: function(event) {
      for(let streetIterator of this.streets) {
        if(streetIterator === event.street) {
          for(let shopIterator of streetIterator.shops) {
            if(shopIterator._id == event.shop._id) {
              shopIterator.items.push(event.item);
            }
          }
        }
      }
    },

    changeShop: function(shop) {
      this.generateNewShop = true;
      this.currentShop = shop;
    },

    changeStreet: function(street) {
      this.currentStreet = street;
    },

    addPlayerToShop: function(playerIndex) {
      if(playerIndex < this.players.length) {
        let player = this.players[playerIndex];
        if(this.cachedShopPlayers.includes(player)) {
          return;
        }

        this.cachedShopPlayers.push(player);
      }
    }
  }
}
</script>

<style>
  #app {
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
  }
</style>
