<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/home">
      <i class="tab-icon"></i>
      <span class="tab-link">首页</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/discovery">
      <i class="tab-icon"></i>
      <span class="tab-link">发现</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/analysis">
      <i class="tab-icon"></i>
      <span class="tab-link">分析</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/search">
      <i class="tab-icon"></i>
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'tab',
    mixins: [],
    data () {
      return {}
    },
    computed: {},
    components: {
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

  .tab
    // position: fixed
    // bottom: 0
    // left: 0
    // right: 0
    overflow: hidden
    display: flex
    justify-content: space-around
    color: $color-text-d
    font-size $font-size-small * 2
    background-color $color-background-d
    padding 18px 0
    border-top 1px solid $color-border
    border-image: linear-gradient($color-border, transparent) 30 30
    .tab-item
      display flex
      flex-basis 25%
      justify-content center
      flex-direction column
      text-align center
      .tab-icon
        display: inline-block
        width 36px
        height 36px
        background-size cover
        margin 0 auto
      .tab-link
        padding 20px 0 0 0
      &:nth-of-type(1)
        .tab-icon
          bg-image('菜单-首页-默认')
      &:nth-of-type(2)
        .tab-icon
          bg-image('菜单-发现-默认')
      &:nth-of-type(3)
        .tab-icon
          bg-image('菜单-分析-默认')
      &:nth-of-type(4)
        .tab-icon
          bg-image('菜单-搜索-默认')
      &.router-link-active
        .tab-link
          color $color-theme
      &.router-link-active:nth-of-type(1)
        .tab-icon
          bg-image('菜单-首页-焦点')
      &.router-link-active:nth-of-type(2)
        .tab-icon
          bg-image('菜单-发现-焦点')
      &.router-link-active:nth-of-type(3)
        .tab-icon
          bg-image('菜单-分析-焦点')
      &.router-link-active:nth-of-type(4)
        .tab-icon
          bg-image('菜单-搜索-焦点')
</style>
