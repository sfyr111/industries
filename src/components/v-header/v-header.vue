<template>
  <div class="v-header">
    <div class="v-header-left">
      <div class="v-header-back" @click="back">
        <span v-if="close">关闭</span>
        <i v-else class="back-icon"></i>
      </div>
    </div>
    <h1 class="v-header-title">
      <span>{{title}}</span>
    </h1>
    <div class="v-header-right">
      <div class="v-header-btn">
        <slot name="right">
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'v-header',
    mixins: [],
    props: {
      title: {
        type: String,
        default: '标题'
      },
      back: {
        type: Function,
        default () {
          window.history.back()
        }
      },
      close: {
        type: Boolean,
        default: false
      }
    },
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

  .v-header
    padding 16px
    background-color $color-background
    display flex
    justify-content space-between
    align-items center
    border-bottom 1px solid $color-border
    border-image: linear-gradient($color-border, transparent) 30 30
    .v-header-left
      .v-header-back
        // height 1.03125rem
        font-size 0
        span
          display inline-block
          width 72px
          height 72px
          line-height 72px
          color $color-theme
          font-size $font-size-medium * 2
          position relative
          left 0.1875rem
          extend-click()
        i.back-icon
          extend-click()
          display inline-block
          width 56px
          height 72px
          line-height 72px
          background-size cover
          bg-image('按钮-返回')
    .v-header-title
      color $color-text
    .v-header-right
      .v-header-btn
        font-size $font-size-small * 2
        width 72px
        height 72px
        line-height 72px
        color $color-theme
</style>
