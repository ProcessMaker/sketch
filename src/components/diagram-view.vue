<template>
    <div class="diagram-view">
        <node class="step" @selected="selectHandler" v-if="model" :item="model" :children="model.children" />
   </div>

</template>

<script>
import node from "./node.vue";

export default {
  components: {
    node
  },
  props: ["model"],
  methods: {
      selectHandler(item) {
          this.$emit('selected', item);
      }
  }
}
</script>

<style scoped lang="scss">
.diagram-view {
  padding-top: 24px;
  text-align: center;

  .step {
    margin: auto;
  }

  .arrow {
    margin: 8px;
  }
}
</style>