<template>
  <transition name="slide">
    <div class="analysis-option">
      <v-header :title="getTitle($route.params.item)" class="header">
        <div slot="right" class="setting-btn" @click="showSettings">
          新建
        </div>
      </v-header>
      <plan-list :planList="planList" :recommendPlanList="recommendPlanList" @deletePlan="_deleteAnalysisPlan"></plan-list>
      <analysis-settings :tabs="tabs"
      ref="analysisSettings" @createPlan="onCreatePlan"></analysis-settings>
    </div>
  </transition>
</template>

<script>
  import VHeader from 'components/v-header/v-header'
  import AnalysisSettings from 'components/analysis-settings/analysis-settings'
  import PlanList from 'base/plan-list/plan-list'
  import { mapGetters } from 'vuex'
  import { ERR_OK } from 'api/config'
  import { getCompanyList, getProductClassify, getTenderClassify, createAnalysisPlan, getAnalysisPlan, getRecommendAnalysisPlan, deleteAnalysisPlan } from 'api'

  export default {
    name: 'analysis-option',
    mixins: [],
    data () {
      return {
        tabs: [],
        planList: [],
        recommendPlanList: []
      }
    },
    computed: {
      ...mapGetters([
        'analysisItem'
      ])
    },
    components: {
      VHeader,
      PlanList,
      AnalysisSettings
    },
    watch: {},
    methods: {
      /**
       * 获取设置总参数
       * @param {object} obj
       * @returns {Promise.<*>}
       */
      async onCreatePlan (obj) {
        switch (this.analysisItem) {
          case 'company': {
            obj.tag = 1
            return await this._createAnalysisPlan(obj)
          }
          case 'product': {
            obj.tag = 2
            return await this._createAnalysisPlan(obj)
          }
          case 'tender': {
            obj.tag = 3
            return await this._createAnalysisPlan(obj)
          }
          default: {
            return await ''
          }
        }
      },
      /**
       * 创建计划
       * @param {String} startTime
       * @param {String} endTime
       * @param {object[]} selectedItems
       * @param {Number} tag
       * @returns {Promise.<*>}
       * @private
       */
      async _createAnalysisPlan ({ startTime, endTime, selectedItems, tag }) {
        const planTitle = selectedItems.map(item => {
          return item.name
        }).join('、')
        const params = {
          tag,
          q: JSON.stringify(selectedItems),
          name: planTitle, // 计划名,
          endPoTime: endTime + ' 23:59:59',
          startPoTime: startTime + ' 00:00:00'
        }
        return await createAnalysisPlan(params)
          .then(data => {
            if (data.code === ERR_OK) return data
            else return Promise.reject()
          })
          .then(this._getAnalysisPlan)
          .then(data => {
            if (data.code === ERR_OK) {
              const { list: planList } = data
              this.planList = planList
              this.$vux.toast.show({
                text: '添加成功',
                time: 500,
                type: 'success'
              })
              this.$refs.analysisSettings.hide()
            }
          })
      },
      async _deleteAnalysisPlan (id) {
        const params = {
          id
        }
        return await deleteAnalysisPlan(params)
          .then(data => {
            if (data.code === ERR_OK) return data
            else return Promise.reject()
          })
          .then(this._getAnalysisPlan)
          .then(data => {
            const { list: planList } = data
            this.planList = planList
            if (data.code === ERR_OK) {
              this.$vux.toast.show({
                text: '删除成功',
                time: 500,
                type: 'success'
              })
              return data
            }
          })
      },
      async _getAnalysisPlan () {
        const params = {
          tag: ''
        }
        switch (this.analysisItem) {
          case 'company': {
            params.tag = 1
            return await getAnalysisPlan(params)
          }
          case 'product': {
            params.tag = 2
            return await getAnalysisPlan(params)
          }
          case 'tender': {
            params.tag = 3
            return await getAnalysisPlan(params)
          }
          default: {
            return await ''
          }
        }
      },
      async _getRecommendAnalysisPlan () {
        const params = {
          tag: ''
        }
        switch (this.analysisItem) {
          case 'company': {
            params.tag = 1
            return await getRecommendAnalysisPlan(params)
          }
          case 'product': {
            params.tag = 2
            return await getRecommendAnalysisPlan(params)
          }
          case 'tender': {
            params.tag = 3
            return await getRecommendAnalysisPlan(params)
          }
          default: {
            return await ''
          }
        }
      },
      hideSettings () {
        this.$refs.analysisSettings.hide()
      },
      showSettings () {
        this.$refs.analysisSettings.show()
      },
      async _getCompanyList () {
        const params = {
        }
        return await getCompanyList(params).then(data => {
          if (data.code === ERR_OK) {
            return data
          }
        })
      },
      async _getProductClassify () {
        const params = {
        }
        return await getProductClassify(params).then(data => {
          if (data.code === ERR_OK) {
            return data
          }
        })
      },
      async _getTenderClassify () {
        const params = {
        }
        return await getTenderClassify(params).then(data => {
          if (data.code === ERR_OK) {
            return data
          }
        })
      },
      async _getClassify (item) {
        switch (item) {
          case 'company': {
            return await this._getCompanyList()
          }
          case 'product': {
            return await this._getProductClassify()
          }
          case 'tender': {
            return await this._getTenderClassify()
          }
          default: {
            return await ''
          }
        }
      },
      async _concurrent () {
        if (!this.analysisItem) this.$router.push('/analysis')
        const data = await Promise.all([this._getClassify(this.analysisItem), this._getAnalysisPlan(), this._getRecommendAnalysisPlan()])

        const [{ list: tabs },
               { list: planList },
               { list: recommendPlanList }] = data

        this.tabs = tabs
        this.planList = planList
        this.recommendPlanList = recommendPlanList

        return data
      },
      getTitle (label) {
        switch (label) {
          case 'company': {
            return '企业分析'
          }
          case 'product': {
            return '产品分析'
          }
          case 'tender': {
            return '招标分析'
          }
          default: {
            return ''
          }
        }
      }
    },
    created () {
      this._concurrent()
    },
    mounted () {}
  }
</script>

<style lang="stylus" scoped>
  @import "~stylus-px2rem/index"
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  html-font-size = 75px;

  .analysis-option
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    z-index 50
    background $color-background
    .header
      .setting-btn
        font-size $font-size-medium * 2

  .slide-enter-active,
  .slide-leave-active
    transition all 0.3s
  .slide-enter,
  .slide-leave-to
    transform translate3d(100%, 0, 0)
</style>
