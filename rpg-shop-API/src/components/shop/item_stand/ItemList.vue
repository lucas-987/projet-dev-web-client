<template>
    <div>
        <div :key="item.id" v-for="(item, index) in items">
            <span>
                {{index}}.
                <Item :item="item" showPrice="true"/>
            </span>    
        </div>
    </div>
</template>

<script>
import Item from '../Item.vue'

export default {
  components: { Item },
    name: "ItemList",
    props: ["items"]
}
</script>

<style scoped>

</style>