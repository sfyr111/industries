<template>
  <div class="date-range">
    <group class="time-group">
      <datetime format="YYYY-MM-DD" v-model="startTime" :placeholder="'请选择'" :min-year="2010" :max-year="2020" @on-change="setStartTime" :title="'起始时间:'" clear-text="起始时间" year-row="{value}年" month-row="{value}月" day-row="{value}日" confirm-text="完成" cancel-text="取消"></datetime>
    </group>
    <group class="time-group">
      <datetime format="YYYY-MM-DD" v-model="endTime" :placeholder="'请选择'" :min-year="2010" :max-year="2020" @on-change="setEndTime" :title="'结束时间:'" clear-text="结束时间" year-row="{value}年" month-row="{value}月" day-row="{value}日" confirm-text="完成" cancel-text="取消"></datetime>
    </group>
  </div>
</template>

<script>
  import { Datetime, Group } from 'vux'

  export default {
    name: 'date-range',
    mixins: [],
    props: {
      startTime: {
        type: String,
        default: ''
      },
      endTime: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
      }
    },
    computed: {},
    components: {
      Group,
      Datetime
    },
    watch: {},
    methods: {
      setStartTime () {
        console.log('starttime')
      },
      setEndTime () {
        console.log('endtime')
      }
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

  .date-range
    display flex
    .time-group
      flex 1 50%
      .vux-no-group-title
        padding-left 18.25px
        > a
          padding 9.125px 0
          font-size $font-size-medium * 2
          .vux-datetime-value
            &::after
              display none
</style>
