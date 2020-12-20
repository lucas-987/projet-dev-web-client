<template>
    <header>
        <h1>{{ title }}</h1>
        <ToggleSwitch id="cheatMode" @switched="retransmitEvent('cheatMode-switched', $event)"
            title="cheat mode" valueFalse="off" valueTrue="on" />
        
        <ComboBox darkTheme="true" showSelectedOption="true" hint="Change Shop" :options="['generate new shop']"
            @selected-option-changed="retransmitEvent('change-shop', $event)" />

        <ComboBox darkTheme="true" showSelectedOption="false" hint="Add a Player to the Shop" :options="playersNames"
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
  props: ['title', 'players'],
  computed: {
      playersNames: function() {
          return this.players.map(player => player.name);
      }
  },
  methods: {
    retransmitEvent: function(name, event) {
        this.$emit(name, event);
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