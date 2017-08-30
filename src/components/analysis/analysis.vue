<template>
  <div class="analysis">
    <v-header title="分析"></v-header>
    <analysis-tab></analysis-tab>
    <router-view></router-view>
  </div>
</template>

<script>
  import VHeader from 'components/v-header/v-header'
  import AnalysisTab from 'components/analysis-tab/analysis-tab'

  export default {
    name: 'analysis',
    mixins: [],
    data () {
      return {}
    },
    computed: {},
    components: {
      VHeader,
      AnalysisTab
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
</style>
