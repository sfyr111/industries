<template>
  <div class="loading">
    <img width="24" height="24" src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>
  export default {
    name: 'loading',
    props: {
      title: {
        type: String,
        default: '正在载入...'
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~stylus-px2rem/index"
  @import "~common/stylus/variable"
  html-font-size = 75px;
  
  .loading
    width 100%
    text-align center
    .desc
      line-height 20px;
      font-size $font-size-small * 2
      color $color-text-l
</style>
