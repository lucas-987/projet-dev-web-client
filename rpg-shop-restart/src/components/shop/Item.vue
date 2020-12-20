<template>
  <span class="root" @dragstart="dragstart">
    <span>
      {{ item.name }}
      <span v-if="showPrice">: {{ item.price }} gold</span>
    </span>
    <img v-if="displayInfo == false" src="../../../public/information.svg" alt="details"
      @click="switchDisplayDetails">
    <div v-else class="infos">
      <p>Type: {{ item.type }}</p>
      <p>Effect: {{ item.effect }}</p>
      <img src="../../../public/close.svg" alt="close"
        @click="switchDisplayDetails"> 
    </div>  
  </span>
</template>

<script>
export default {
  name: 'Item',
  props: ['item', 'showPrice'],
  data() {
    return {
      displayInfo: false
    }
  },
  methods: {
    dragstart: function(event) {
      this.$emit('dragstart', event);
    },
    switchDisplayDetails: function() {
      this.displayInfo = !this.displayInfo;
    }
  }
}
</script>

<style scoped>

  img {
    width: 1em;
    cursor: pointer;
  }

  .root {
    display: flex;
    flex-direction: column;
  }

  .infos {
    position: relative;
    z-index: 1;
    box-shadow: 2px 2px 10px 3px;
    background-color: white;
    justify-self: start;
  }

  .infos > img {
    position: absolute;
    right: 1px;
    top: 1px;
  }

</style>