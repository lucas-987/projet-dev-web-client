<template>
  <div id="app">
    <Header title="RPG shop" :players="players" @MOTG-switched="handleMOTGswitched"
      @cheatMode-switched="handleCheatModeSwitched" @change-shop="changeShop"
      @add-player-to-shop="addPlayerToShop" />

    <Shop v-if="!masterOfTheGame" :shopName="currentShopName" :items="generateShopStock()" 
      :players="generateShopPlayers()" :cheatMode="cheatMode" />

    <MasterOfTheGame v-else @create-player="addNewPlayer" 
      @create-item="addNewItem" :cheatMode="cheatMode" />
  </div>
</template>

<script>
import Header from './components/header/Header.vue'
import MasterOfTheGame from './components/master_of_the_game/MasterOfTheGame.vue'
import Shop from './components/shop/Shop.vue'

//importing items and players from model
import {items as itemsFromModel, nbMaxItems, players as playersFromModel} from './model'

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
      players: playersFromModel,
      items: itemsFromModel,
      masterOfTheGame: false,
      cheatMode: false,
      generateNewShop: true,
      cachedShopPlayers: [],
      cachedShopItems: [],
      currentShopName: 'Awesome Shop'
    }
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
  

        let shopPlayers = playersCopy.slice(0, utilitaryFunctions.randInt(playersCopy.length));
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

    changeShop: function(shopName) {
      if(shopName == 'generate new shop') {
        this.generateNewShop = true;

        const adjectives = ['Awesome', 'Fantastic', 'Marvelous', 'Extraordinary', 'Tremendous', 'Brilliant', 'Special', 'Amazing', 'Magnificent', 'Sublim'];
        
        let newName;
        do {
          newName = adjectives[utilitaryFunctions.randInt(adjectives.length)] + ' Shop';
        }while(newName == this.currentShopName);

        this.currentShopName = newName;
      }
    },

    addPlayerToShop: function(playerName) {
      for(const player of this.players) {
        if(player.name == playerName) {
          if(this.cachedShopPlayers.includes(player)) {
            return;
          }

          this.cachedShopPlayers.push(player);
        }
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
