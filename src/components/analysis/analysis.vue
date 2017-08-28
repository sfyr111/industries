<template>
  <div class="analysis">
    <v-header title="分析"></v-header>
    <div class="analysis-icon">
      <div class="analysis-row">
        <div class="analysis-col">
          <i class="enterprise"></i>
          <span>企业数据分析</span>
        </div>
        <div class="analysis-col">
          <i class="product"></i>
          <span>产品数据分析</span>
        </div>
        
      </div>
      <div class="analysis-row">
        <div class="analysis-col">
          <i class="tender"></i>
          <span>招标数据分析</span>
        </div>
        <div class="analysis-col">
          <i class="analysis-data"></i>
          <span>数据分析</span>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
  import VHeader from 'components/v-header/v-header'
  export default {
    name: 'analysis',
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

  .analysis
    // position fixed
    // top 0
    // bottom 120px
    flex-grow: 1
    overflow: auto
    width 100%
    height calc(100% - 48px)
    background-color $color-background-d
    .analysis-icon
      background $color-background-d
    .analysis-row
      height 360px
      width 750px
      padding-top 10px
      display flex
      justify-content space-between
      .analysis-col
        background #fff
        width 370px
        height 360px
        display flex
        justify-content center
        flex-direction column
        align-items center
        i 
          width 160px
          height 160px
          margin-bottom 85px 
        .enterprise
          bg-image('icon-企业')
          background-size 100% 100%
        .product
          bg-image('icon-产品')
          background-size 100% 100%
        .tender
          bg-image('icon-招标')
          background-size 100% 100%
        .analysis-data
          bg-image('icon-数据分析')
          background-size 100% 100%
</style>
