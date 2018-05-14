<template>
    <div class="node">
        <div class="element">
            <div @click="select(item)" class="step" :class="{selected: item.selected}">
            <component :is="item.type" :config="item.config" />
            </div>
       </div>
        <div class="children">
            <div class="child" :key="index" v-for="(item, index) in children">
            <div class="arrow-connectors">
            <font-awesome-icon :icon="downIcon" />
            </div>
            <node @selected="select" :item="item" :children="item.children" />
            </div>
        </div>
    </div>
</template>

<script>
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";

import { faPlusCircle } from "@fortawesome/fontawesome-free-solid";
import { faArrowDown } from "@fortawesome/fontawesome-free-solid";

// Bring in our components
import start from "./steps/start.vue";

export default {
  name: "node",
  components: {
    start
  },
  props: ["item", "children"],
  components: {
    FontAwesomeIcon,
    start
  },
  data() {
    return {
      downIcon: faArrowDown
    };
  },
  methods: {
    select(item) {
      this.$emit("selected", item);
    }
  }
};
</script>
 
<style lang="scss" scoped>
.node {
  display: inline-block;
  margin-left: 8px;
  margin-right: 8px;

  .step {
    display: inline-block;
    &.selected {
      outline: solid;
      outline-width: 2px;
      outline-style: dotted;
      outline-color: #3397e2;
      outline-offset: 1px;
    }
  }

  .element {
    cursor: pointer;
  }

  .arrow-connectors {
    text-align: center;
  }

  .child {
    display: inline-block;
    vertical-align: top;
  }
}
</style>
 
