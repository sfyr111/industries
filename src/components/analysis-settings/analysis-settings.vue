<template>
  <transition name="slide">
    <div class="analysis-settings" v-show="showFlag">
      <v-header :title="getTitle($route.params.item)" :back="hide"></v-header>
      <div class="date-range-wrapper">
        <date-range :startTime="startTime" :endTime="endTime" @changeDate="onChangeDate"></date-range>
      </div>
      <div class="classify-tabs-wrapper">
        <classify-tabs :checkerItem="$attrs.tabs" @selectedItem="onSelectedItem"></classify-tabs>
      </div>
      <div class="establish">
        <p class="establish-font" @click="createPlan">
          创建
        </p>
      </div>
    </div>
  </transition>
</template>

<script>
  import VHeader from 'components/v-header/v-header'
  import DateRange from 'base/date-range/date-range'
  import ClassifyTabs from 'base/classify-tabs/classify-tabs.vue'

  export default {
    name: 'analysis-settings',
    mixins: [],
    props: {
    },
    data () {
      return {
        showFlag: false,
        startTime: '',
        endTime: '',
        selectedItems: []
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
      createPlan () {
        const itemsObj = {
          startTime: this.startTime,
          endTime: this.endTime,
          selectedItems: this.selectedItems
        }
        this.$emit('createPlan', itemsObj)
      },
      onChangeDate ({ dateStartTime, dateEndTime }) {
        this.startTime = dateStartTime
        this.endTime = dateEndTime
      },
      onSelectedItem (items) {
        console.log(items)
        this.$nextTick(() => {
          this.selectedItems = items
        })
      },
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
    background-color: $color-background
    .establish
      display flex
      align-items center
      justify-content center
    .establish-font
      width 245px
      height 80px
      display flex
      align-items center
      justify-content center
      color #ffffff
      background #4799FE
      border-radius 20px
  .slide-enter-active,
  .slide-leave-active
    transition all 0.3s
  .slide-enter,
  .slide-leave-to
    transform translate3d(100%, 0, 0)
</style>
