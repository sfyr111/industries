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
        <section>
          <p>产品简要介绍：</p>
          <p>
            北信源行业态势分析软件通过对行业及企业相关数据的采集和分析，从公司管理者、行业竞争企业、竞争产品等方面对这些数据大数据分析，为企业管理者提供行业决策、公司决策 的参考依据
          </p>
        </section>
        <p>
          版本号: v1.0
        </p>
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
    .help-menu
      display: flex;
      height: 5rem;
      flex-direction: column;
      justify-content: space-around;
      padding: 0 .5rem;
      line-height: 1.5em;
      font-size: 14px * 2
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
