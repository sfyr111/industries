<template>
  <div class="analysis-tab">
    <router-link class="analysis-tab-item" to="/analysis/company">
      <section @click="selectAnalysis('company')">
        <div class="analysis-tab-title">
          <i class="analysis-tab-icon"></i>
          <span class="analysis-tab-link">企业数据分析</span>
        </div>
        <i class="analysis-tab-make"></i>
      </section>
    </router-link>
    <router-link class="analysis-tab-item" to="/analysis/product">
      <section @click="selectAnalysis('product')">
        <div class="analysis-tab-title">
          <i class="analysis-tab-icon"></i>
          <span class="analysis-tab-link">产品数据分析</span>
        </div>
        <i class="analysis-tab-make"></i>
      </section>
    </router-link>
    <router-link class="analysis-tab-item" to="/analysis/tenderProduct">
      <section @click="selectAnalysis('tenderProduct')">
        <div class="analysis-tab-title">
          <i class="analysis-tab-icon"></i>
          <span class="analysis-tab-link">产品招标数据分析</span>
        </div>
        <i class="analysis-tab-make"></i>
      </section>
    </router-link>
    <router-link class="analysis-tab-item" to="/analysis/tenderCompany">
      <section @click="selectAnalysis('tenderCompany')">
        <div class="analysis-tab-title">
          <i class="analysis-tab-icon"></i>
          <span class="analysis-tab-link">企业招标数据分析</span>
        </div>
        <i class="analysis-tab-make"></i>
      </section>
    </router-link>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    name: 'analysis-tab',
    mixins: [],
    props: {
    },
    data () {
      return {
      }
    },
    computed: {},
    components: {
    },
    watch: {},
    methods: {
      selectAnalysis (item) {
        this.setAnalysisItem(item)
      },
      ...mapMutations({
        'setAnalysisItem': 'SET_ANALYSIS_ITEM'
      })
    },
    created () {},
    mounted () {
    }
  }
</script>

<style lang="stylus">
  @import "~stylus-px2rem/index"
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  html-font-size = 75px;

  .analysis-tab
    display flex
    flex-wrap wrap
    .analysis-tab-item
      // flex 1 50%
      background-color $color-background-d
      height 170px
      width 750px
      box-sizing border-box
      padding 0.1rem
      > section
        width 100%
        height 100%
        display flex
        justify-content space-between
        align-items center
        background-color #fff
        .analysis-tab-title
          display flex
          align-items center
        .analysis-tab-icon
          display block
          width 160px
          height 160px
          background-size 100%
          margin-left 15px
        .analysis-tab-link
          color $color-text
          padding 0.5rem 0
          margin-left 40px
      &:nth-of-type(1)
        .analysis-tab-icon
          bg-image('icon-企业')
      &:nth-of-type(2)
        .analysis-tab-icon
          bg-image('icon-产品')
      &:nth-of-type(3)
        .analysis-tab-icon
          bg-image('icon-招标')
      &:nth-of-type(4)
        .analysis-tab-icon
          bg-image('icon-数据分析')
      .analysis-tab-make
        width 60px
        height 60px
        margin-right 15px
        background-size cover
        bg-image('按钮-返回')
</style>
