<template>
  <transition name="slide">
    <div class="analysis-settings" v-if="true">
      <v-header :title="getTitle($route.params.item)" :back="hide"></v-header>
      <div class="date-range-wrapper">
        <date-range
          :startTime="(modifyItem.startPoTime || startTime) | formatDate"
          :endTime="(modifyItem.endPoTime || endTime) | formatDate"
          @changeDate="onChangeDate">
        </date-range>
      </div>
      <div class="classify-tabs-wrapper">
        <classify-tabs
          :checkerItem="$attrs.tabs"
          @modifyItem="onModifiyItem"
          @selectedItem="onSelectedItem">
        </classify-tabs>
      </div>
      <div class="settings-btn-wrapper">
        <p class="btn" @click="createPlan" v-show="!modifyItem.id">
          创建
        </p>
        <p class="btn" @click="modifyPlan" v-show="modifyItem.id">
          修改
        </p>
      </div>
    </div>
  </transition>
</template>

<script>
  import { dateMixin } from 'common/js/mixin'
  import { mapGetters, mapMutations } from 'vuex'
  import { dateFormat } from 'vux'
  import VHeader from 'components/v-header/v-header'
  import DateRange from 'base/date-range/date-range'
  import ClassifyTabs from 'base/classify-tabs/classify-tabs.vue'

  export default {
    name: 'analysis-settings',
    mixins: [dateMixin],
    props: {
    },
    data () {
      return {
        showFlag: false,
        startTime: dateFormat(Date.now() - 30 * 24 * 60 * 60 * 1000, 'YYYY-MM-DD'),
        endTime: dateFormat(Date.now(), 'YYYY-MM-DD'),
        selectedItems: []
      }
    },
    computed: {
      ...mapGetters({
        modifyItem: 'analysis/modifyItem'
      })
    },
    components: {
      VHeader,
      DateRange,
      ClassifyTabs
    },
    watch: {},
    methods: {
      ...mapMutations({
        clearModifyItem: 'analysis/CLEAR_MODIFY_ITEM'
      }),
      onModifiyItem (items) {
        this.selectedItems = items
      },
      modifyPlan () {
        if (!this.checkTime(this.startTime, this.endTime)) return
        if (!this.checkItem(this.selectedItems)) return
        const itemsObj = {
          startTime: this.startTime,
          endTime: this.endTime,
          selectedItems: this.selectedItems
        }
        this.$emit('modifyPlan', itemsObj)
        this._clearItem()
      },
      createPlan () {
        if (!this.checkTime(this.startTime, this.endTime)) return
        if (!this.checkItem(this.selectedItems)) return
        const itemsObj = {
          startTime: this.startTime,
          endTime: this.endTime,
          selectedItems: this.selectedItems
        }
        console.log(itemsObj)
        this.$emit('createPlan', itemsObj)
        this._clearItem()
      },
      checkTime (startTime, endTime) {
        if (Date.parse(startTime) >= Date.parse(endTime)) {
          this.$vux.toast.show({
            text: '起始时间必须小于结束时间',
            time: 1000,
            type: 'warn'
          })
          return false
        }
        return true
      },
      checkItem (selectedItems) {
        if (selectedItems.length < 2) {
          this.$vux.toast.show({
            text: '至少选择两个对比项目',
            time: 1000,
            type: 'warn'
          })
          return false
        }
        return true
      },
      onChangeDate ({ dateStartTime, dateEndTime }) {
        this.startTime = dateStartTime
        this.endTime = dateEndTime
      },
      onSelectedItem (items) {
        this.$nextTick(() => {
          this.selectedItems = items
        })
      },
      show () {
        this.$emit('show')
//        this.showFlag = true
      },
      hide () {
        this._clearItem()
        this.$emit('hide')
//        this.showFlag = false
      },
      getTitle (label) {
        switch (label) {
          case 'company': {
            return '企业分析设置'
          }
          case 'product': {
            return '产品分析设置'
          }
          case 'tenderProduct': {
            return '产品招标分析设置'
          }
          case 'tenderCompany': {
            return '企业招标分析设置'
          }
          default: {
            return ''
          }
        }
      },
      _clearItem () {
        this.clearModifyItem()
        this.startTime = ''
        this.endTime = ''
        this.selectedItems = []
      }
    },
    created () {
      if (this.modifyItem.id) {
        this.startTime = this.modifyItem.startPoTime.trim().slice(0, 10)
        this.endTime = this.modifyItem.endPoTime.trim().slice(0, 10)
      }
    },
    mounted () {
    },
    activated () {
    }
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
    .settings-btn-wrapper
      display flex
      align-items center
      justify-content center
      .btn
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
