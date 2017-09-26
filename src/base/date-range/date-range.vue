<template>
  <div class="date-range">
    <group class="time-group">
      <datetime format="YYYY-MM-DD" v-model="dateStartTime" :placeholder="'请选择'" :min-year="2010" :max-year="2017" @on-change="setStartTime" :title="'起始时间:'" clear-text="起始时间" year-row="{value}年" month-row="{value}月" day-row="{value}日" confirm-text="完成" cancel-text="取消"></datetime>
    </group>
    <group class="time-group">
      <datetime format="YYYY-MM-DD" v-model="dateEndTime" :placeholder="'请选择'" :min-year="2010" :max-year="2017" @on-change="setEndTime" :title="'结束时间:'" clear-text="结束时间" year-row="{value}年" month-row="{value}月" day-row="{value}日" confirm-text="完成" cancel-text="取消"></datetime>
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
        dateStartTime: '',
        dateEndTime: ''
      }
    },
    computed: {
    },
    components: {
      Group,
      Datetime
    },
    watch: {},
    methods: {
      setStartTime () {
//        if (!this.checkTime()) return
        this.$emit('changeDate', {
          dateStartTime: this.dateStartTime,
          dateEndTime: this.dateEndTime
        })
      },
      setEndTime () {
//        if (!this.checkTime()) return
        this.$emit('changeDate', {
          dateStartTime: this.dateStartTime,
          dateEndTime: this.dateEndTime
        })
      },
      checkTime () {
        if (Date.parse(this.dateStartTime) >= Date.parse(this.dateEndTime)) {
          this.$vux.toast.show({
            text: '起始时间必须小于结束时间',
            time: 1000,
            type: 'warn'
          })
          return false
        }
        return true
      }
    },
    created () {
      this.dateStartTime = this.startTime
      this.dateEndTime = this.endTime
    },
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
