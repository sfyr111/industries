<template>
  <transition name="slide">
    <div class="help">
      <v-header title="帮助"></v-header>
      <block></block>
      <div class="logo"></div>
      <div class="help-menu">
        <!-- <router-link tag="div" to="/introduce" >行业态势分析简介</router-link>
        <router-link tag="div" to="/copyright" >行业态势分析版权声明</router-link>
        <router-link tag="div" to="/versions" >行业态势分析版本声明</router-link> -->
      </div>
    </div>
  </transition>
</template>

<script>
  import Block from 'base/block/block'
  import VHeader from 'components/v-header/v-header'

  export default {
    name: 'help',
    mixins: [],
    data () {
      return {}
    },
    computed: {},
    components: {
      Block,
      VHeader
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

  .help
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    background-color $color-background
    .logo
      height 380px
      background url('xydd-logo.png') no-repeat center
    .help-menu div
      height 90px
      line-height 90px
      border-top 1px solid #ededed
      color $color-text
      font-size 30px
      padding-left 48px
      &:last-child
        border-bottom 1px solid #ededed

  .slide-enter-active,
  .slide-leave-active
    transition all 0.3s
  .slide-enter,
  .slide-leave-to
    transform translate3d(100%, 0, 0)
</style>
