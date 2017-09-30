<template>
  <transition name="slide">
    <div class="analysis-detail">
      <v-header :title="getTitle(analysisItem)" class="header">
        <div slot="right" class="change-btn" @click="changeType">
          切换
        </div>
      </v-header>
      <div class="title-wrapper">
        <h2>{{selectedItem.name}}</h2>
        <!--<span class="time">{{ selectedItem.startPoTime | formatDate }} 至 {{ selectedItem.endPoTime | formatDate }}</span>-->
        <date-range
          :startTime="selectedItem.startPoTime | formatDate"
          :endTime="selectedItem.endPoTime | formatDate"
          @changeDate="_changeDate"></date-range>
        <!--<span class="describe">企业竞争力分析报告</span>-->
      </div>
      <div class="chart">
        <div class="chart-title">时间趋势图表</div>
        <ve-chart
          :data="normalizLineData(chartData0)"
          :settings="chartSettings"></ve-chart>
      </div>
      <loading class="loading" v-show="!chartData0.times.length"></loading>
    </div>
  </transition>
</template>

<script>
  import VeChart from 'v-charts/lib/chart.min'
  import DateRange from 'base/date-range/date-range'
  import VHeader from 'components/v-header/v-header'
  import Loading from 'base/loading/loading'
  import { mapGetters, mapMutations } from 'vuex'
  import { chartDataMixin, dateMixin } from 'common/js/mixin'
  import { ERR_OK } from 'api/config'
  import { getChart0 } from 'api'
  import bus from 'common/js/bus'

  export default {
    name: 'analysis-detail',
    mixins: [chartDataMixin, dateMixin],
    props: {},
    data () {
      return {
        chartSettings: {},
        chartData0: {
          bars: [],
          times: []
        }
      }
    },
    computed: {
      ...mapGetters([
        'analysisItem'
      ]),
      ...mapGetters({
        selectedItem: 'analysis/selectedItem'
      })
    },
    components: {
      VeChart,
      VHeader,
      Loading,
      DateRange
    },
    methods: {
      ...mapMutations({
        changeDateSelectedItem: 'analysis/CHANGE_DATE_SELECTED_ITEM'
      }),
      _changeDate (date) {
        if (!this.checkTime(date.dateStartTime, date.dateEndTime)) return
        const params = {
          startTime: date.dateStartTime,
          endTime: date.dateEndTime,
          selectedItems: JSON.parse(this.selectedItem.q),
          id: this.selectedItem.id,
          tag: this.selectedItem.tag
        }
        this.changeDateSelectedItem(date)
        this._concurrent()
        bus.$emit('busChangeDate', params)
      },
      changeType () {
        this.index++
        if (this.index >= this.typeArr.length) { this.index = 0 }
        this.chartSettings = { type: this.typeArr[this.index] }
      },
      async _getChart0 () {
        const params = {
          id: this.selectedItem.id,
          q: this.selectedItem.q,
          tag: this.selectedItem.tag,
          startPoTime: this.selectedItem.startPoTime,
          endPoTime: this.selectedItem.endPoTime
        }
        return await getChart0(params).then(data => {
          if (data.code === ERR_OK) {
            return data
          }
        })
      },
      async _concurrent () {
        const data = await Promise.all([this._getChart0()])

        const [{ obj: chartData0 }] = data
        this.chartData0 = chartData0
      },
      getTitle (label) {
        switch (label) {
          case 'company': {
            return '企业竞争力分析报告'
          }
          case 'product': {
            return '产品竞争力分析报告'
          }
          case 'tenderProduct': {
            return '产品招标竞争力分析报告'
          }
          case 'tenderCompany': {
            return '企业招标竞争力分析报告'
          }
          default: {
            return ''
          }
        }
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
      this._concurrent()
      if (!this.selectedItem.id) this.$router.push('/analysis')
    },
    mounted () {}
  }
</script>

<style scoped lang="stylus">
  @import "~stylus-px2rem/index"
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  html-font-size = 75px;

  .analysis-detail
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    z-index 100
    background-color #fff
    .header
      .change-btn
        font-size $font-size-medium * 2
    .title-wrapper
      padding 20px
      line-height 1.5em
      display flex
      flex-direction column
      // border-bottom 1px solid $color-border
      // border-image linear-gradient(#b2b2b2, transparent) 30 30
      > span
        font-size $font-size-small * 2
        color $color-text-d
    .chart
      width 100%
      > .chart-title
        font-size $font-size-medium * 2
        color $color-theme
        background-color rgba(11, 98, 201, 0.2)
        padding 10px 20px
    .loading
      position absolute
      top 50%

    .slide-enter-active,
    .slide-leave-active
      transition all 0.3s
    .slide-enter,
    .slide-leave-to
      transform translate3d(100%, 0, 0)
</style>
