<template>
<transition name="slide">
  <div class="versions">
    <v-header title="行业态势分析版本声明"></v-header>
    <block></block>
    <div class="content">
      <div>V1.0版本发布声明：<p>1、基础版本发布</p></div>
    </div>
  </div>
</transition>
</template>

<script>
  import Block from 'base/block/block'
  import VHeader from 'components/v-header/v-header'

  export default {
    name: 'versions',
    mixins: [],
    data () {
      return {}
    },
    computed: {},
    components: {
      VHeader,
      Block
    },
    watch: {},
    methods: {
    },
    created () {},
    mounted () {}
  }
</script>

<style lang="stylus" scoped>
  @import "~stylus-px2rem/index"
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  html-font-size = 75px;

  .versions
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    background-color $color-background
    .content
      padding 50px 30px
      & p
        color $color-text
        line-height 50px
        font-size 28px
        //text-indent 1em

  .slide-enter-active,
  .slide-leave-active
    transition all 0.3s
  .slide-enter,
  .slide-leave-to
    transform translate3d(100%, 0, 0)
</style>
