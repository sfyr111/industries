<template>
  <transition name="slide">
    <div class="introduce">
      <v-header title="行业态势分析简介"></v-header>
      <block></block>
      <div class="content">
        <p>北信源行业态势分析软件对互联网上公开的行业及企业相关数据采集，从公司管理者、行业竞争企业、竞争产品等方面对这些数据进行大数据分析，为企业管理者提供行业决策、公司决策的参考依据</p>
      </div>
    </div>
  </transition>
</template>

<script>
  import VHeader from 'components/v-header/v-header'
  import Block from 'base/block/block'

  export default {
    name: 'introduce',
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

  .introduce
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
        text-indent 2em
        
  .slide-enter-active,
  .slide-leave-active
    transition all 0.3s
  .slide-enter,
  .slide-leave-to
    transform translate3d(100%, 0, 0)
</style>
