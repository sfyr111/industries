<template>
  <transition name="slide">
    <div class="analysis-settings" v-show="showFlag">
      <v-header :title="getTitle($route.params.item)" :back="hide"></v-header>
      <div class="date-range-wrapper">
        <date-range :startTime="startTime" :endTime="endTime"></date-range>
      </div>
      <div class="classify-tabs-wrapper">
        <classify-tabs v-bind="$attrs"></classify-tabs>
      </div>
    </div>
  </transition>
</template>

<script>
  import VHeader from 'components/v-header/v-header'
  import DateRange from 'base/date-range/date-range'
  import ClassifyTabs from 'base/classify-tabs/classify-tabs'

  export default {
    name: 'analysis-settings',
    mixins: [],
    props: {
    },
    data () {
      return {
        showFlag: false,
        startTime: '',
        endTime: ''
      }
    },
    computed: {
    },
    components: {
      VHeader,
      DateRange,
      ClassifyTabs
    },
    watch: {},
    methods: {
      show () {
        this.showFlag = true
      },
      hide () {
        this.showFlag = false
      },
      getTitle (label) {
        switch (label) {
          case 'company': {
            return '企业分析设置'
          }
          case 'product': {
            return '产品分析设置'
          }
          case 'tender': {
            return '招标分析设置'
          }
          default: {
            return ''
          }
        }
      }
    },
    created () {
    },
    mounted () {}
  }
</script>

<style lang="stylus">
  @import "~stylus-px2rem/index"
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  html-font-size = 75px;

  .analysis-settings
    position fixed
    top 0
    bottom 0
    left 0
    right 0

  .slide-enter-active,
  .slide-leave-active
    transition all 0.3s
  .slide-enter,
  .slide-leave-to
    transform translate3d(100%, 0, 0)
</style>
