<template>
            <div class="start">
                <img :src="icon" />
                <div class="inner">
                    <div class="title">{{config.title}}</div>
                    <div class="description">{{config.description}}</div>
                </div>
            </div>
</template>

<script>
import base from "./base.js";
import startIcon from "../../icons/start.png";

export default {
    name: 'start',
    mixins: [base],
  data() {
    return {
      selected: false,
      icon: startIcon,
    };
  }
};
</script>
 
<style lang="scss" scoped>
.start {
  display: block;
  width: 300px;
  overflow: hidden;
  background-color: white;
  border: 1px solid grey;
  text-align: left;

  &.selected {
    outline: solid;
    outline-width: 2px;
    outline-style: dotted;
    outline-color: #3397e2;
    outline-offset: 1px;
  }

  img {
    float: left;
    width: 48px;
    height: 48px;
    border-right: 1px solid grey;
  }

  .inner {
    margin-left: 48px;
    border-bottom: 4px solid #3397e2;
    height: 48px;
    padding-left: 4px;
    padding-right: 8px;

    .title {
        overflow: hidden;
        white-space: nowrap;
      font-weight: bold;
      font-size: 1.1em;
      line-height: 1.4em;
    }

    .description {
      font-size: 0.8em;
      line-height: 1.2em;
    }
  }
}
</style>
 
