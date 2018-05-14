<template>
    <div @click="select" class="step" :class="{selected: selected}">
        <img :src="icon" />
        <div class="inner">
            <div class="title">{{title}}</div>
            <div class="description">{{description}}</div>
        </div>
    </div>
</template>

<script>
export default {

};
</script>
 
<style lang="scss" scoped>
.step {
    background-color: white;
    margin: 8px auto;
    width: 300px;
    border: 1px solid grey;
    text-align: left;

    &.selected {
        outline: solid;
        outline-width: 2px;
        outline-style: dotted;
        outline-color: #3397E2;
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
        border-bottom: 4px solid #3397E2;
        height: 48px;
        padding-left: 4px;

        .title {
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
 
