<template>
  <transition name="slide">
    <div class="rank-detail" v-if="showFlag">
      <v-header class="header" :title="title" :back="hide">
        <div slot="right" class="change-btn" @click="changeType">
          切换
        </div>
      </v-header>
      <date-range v-on="$listeners" :startTime="$attrs.startTime" :endTime="$attrs.endTime"></date-range>
      <div class="chart">
        <ve-chart
          :data="normalizLineData(chartData)"
          :settings="chartSettings">
        </ve-chart>
      </div>
    </div>
  </transition>
</template>

<script>
  import VeChart from 'v-charts/lib/chart.min'
  import VHeader from 'components/v-header/v-header'
  import DateRange from 'base/date-range/date-range'
  import { chartDataMixin } from 'common/js/mixin'

  export default {
    name: 'rank-detail',
    mixins: [chartDataMixin],
    props: {
      title: {
        type: String,
        default: '竞争力详情'
      },
      chartData: {
        type: Object,
        default: null
      }
    },
    data () {
      return {
        showFlag: false,
        chartSettings: {}
      }
    },
    computed: {
    },
    components: {
      VeChart,
      VHeader,
      DateRange
    },
    methods: {
      show () {
        this.showFlag = true
      },
      hide () {
        this.showFlag = false
      },
      changeType () {
        this.index++
        if (this.index >= this.typeArr.length) { this.index = 0 }
        this.chartSettings = { type: this.typeArr[this.index] }
      }
    },
    created () {
      this.typeArr = ['line', 'histogram', 'bar']
      this.index = 0
      this.chartSettings = {
        type: this.typeArr[this.index],
        label: {
          normal: { show: true }
        }
      }
    },
    mounted () {
    }
  }
</script>

<style scoped lang="stylus">
  @import "~stylus-px2rem/index"
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  html-font-size = 75px;

  .rank-detail
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    z-index 50
    background $color-background
    .header
      .change-btn
        font-size $font-size-medium * 2
    .chart
      margin-top 1rem
      width 100%

  .slide-enter-active,
  .slide-leave-active
    transition all 0.3s
  .slide-enter,
  .slide-leave-to
    transform translate3d(100%, 0, 0)
</style>
