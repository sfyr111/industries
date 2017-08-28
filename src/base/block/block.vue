<template>
  <div class="block" :style="{height: height + 'rem'}">
  </div>
</template>

<script>
  export default {
    name: 'block',
    props: {
      height: {
        type: Number,
        default: 0.266666666666667
      }
    }
  }
</script>

<style lang="stylus">
  @import "~stylus-px2rem/index"
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  html-font-size = 75px;

  .block
    background-color $color-background-d
</style>
