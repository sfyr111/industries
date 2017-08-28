<template>
  <transition name="slide">
    <div class="user">
      <v-header title="设置"></v-header>
      <div class="userSelect">
        <router-link tag="div" to="/user/personal" class="option-box">
          <div class="option-left">
            <i class="userMessage"></i>
            <span class="option-txt">修改个人设置</span>
          </div>
          <i class="option-back"></i>
        </router-link>
        <router-link tag="div" to="/user/favorites" class="option-box" >
          <div class="option-left">
            <i class="enshrine"></i>
            <span class="option-txt">我的收藏夹</span>
          </div>
          <i class="option-back"></i>
        </router-link>
        <router-link to='/user/help' tag="div" class="option-box" >
          <div class="option-left">
            <i class="help"></i>
            <span class="option-txt">帮助</span>
          </div>
          <i class="option-back"></i>
        </router-link>
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
  import VHeader from 'components/v-header/v-header'

  export default {
    name: 'user',
    mixins: [],
    data () {
      return {}
    },
    computed: {},
    components: {
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

  .user
    position fixed
    top 0
    bottom 0
    width 100%
    z-index 50
    background-color $color-background-d
  .userSelect
    margin-top 20px
    background $color-background
    border-top 1px solid #ededed
    border-bottom 1px solid #ededed
  .option-box
    height 102px
    display flex
    justify-content space-between
    align-items center
    padding 0px 25px
    border-top 1px solid #ededed
    &:nth-child(1)
      border-top none
    .option-back
      width 40px
      height 40px
      bg-image('按钮-下一页')
      background-size 100% 100%
    .option-left
      display flex
      align-items center
      & i
        width 66px
        height 66px
        background-size 100% 100%
      & span
        margin-left 26px
        color $color-theme
      .help
        bg-image('图标-帮助')
      .userMessage
        bg-image('图标-个人信息')
      .enshrine
        bg-image('图标-我的分享')

  .slide-enter-active,
  .slide-leave-active
    transition all 0.3s
  .slide-enter,
  .slide-leave-to
    transform translate3d(100%, 0, 0)
</style>
