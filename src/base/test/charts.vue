<template>
  <div class="">
    <div class="chart">
      <ve-line
        :data="chartData"
        :settings="chartSettings">
      </ve-line>
    </div>
  </div>
</template>

<script>
  import VeLine from 'v-charts/lib/line'

  export default {
    name: '',
    mixins: [],
    props: {
    },
    data () {
      return {
        chartData: null,
        chartSettings: {
          label: {
            normal: { show: true }
          }
        }
      }
    },
    computed: {},
    components: {
      VeLine
    },
    methods: {},
    created () {
      this.$nextTick(() => {
        setTimeout(() => {
          this.chartData = {
            columns: ['日期', '销售额-1季度'],
            rows: [
              { '日期': '1月1日', '销售额-1季度': 1523, '销售额-2季度': 1523, '占比': 0.12, '其他': 100 },
              { '日期': '1月2日', '销售额-1季度': 1223, '销售额-2季度': 1523, '占比': 0.345, '其他': 100 },
              { '日期': '1月3日', '销售额-1季度': 2123, '销售额-2季度': 1523, '占比': 0.7, '其他': 100 },
              { '日期': '1月4日', '销售额-1季度': 4123, '销售额-2季度': 1523, '占比': 0.31, '其他': 100 },
              { '日期': '1月5日', '销售额-1季度': 3123, '销售额-2季度': 1523, '占比': 0.12, '其他': 100 },
              { '日期': '1月6日', '销售额-1季度': 7123, '销售额-2季度': 1523, '占比': 0.65, '其他': 100 }
            ]
          }
        }, 3000)
      })
    },
    mounted () {}
  }
</script>

<style scoped lang="stylus">
  @import "~stylus-px2rem/index"
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  html-font-size = 75px;

</style>
