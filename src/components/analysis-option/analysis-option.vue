<template>
  <transition name="slide">
    <div class="analysis-option">
      <v-header :title="getTitle($route.params.item)" class="header">
        <div slot="right" class="setting-btn" @click="showSettings">
          新建
        </div>
      </v-header>
      <plan-list :planList="planList"
                 :recommendPlanList="recommendPlanList"
                 :isShowLoading="isShowLoading"
                 @deletePlan="_deleteAnalysisPlan"
                 @modifyPlan="_modifyPlan"
                 @selectedItem="_selectedItem"></plan-list>
      <analysis-settings
        v-if="showSetting"
        :tabs="tabs"
        ref="analysisSettings"
        @createPlan="onCreatePlan"
        @modifyPlan="_modifyAnalysisPlan"
        @show="showSettings"
        @hide="hideSettings">
      </analysis-settings>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
  import VHeader from 'components/v-header/v-header'
  import PlanList from 'base/plan-list/plan-list'
  import { mapGetters, mapMutations } from 'vuex'
  import { ERR_OK } from 'api/config'
  import { getCompanyList, getProductClassify, getTenderProductsClassify, getTenderCompanyClassify, createAnalysisPlan, getAnalysisPlan, getRecommendAnalysisPlan, deleteAnalysisPlan, modifyAnalysisPlan } from 'api'

  export default {
    name: 'analysis-option',
    mixins: [],
    data () {
      return {
        showSetting: false,
        tabs: [],
        planList: [],
        recommendPlanList: [],
        isShowLoading: false
      }
    },
    computed: {
      ...mapGetters([
        'analysisItem'
      ]),
      ...mapGetters({
        modifyItem: 'analysis/modifyItem'
      })
    },
    components: {
      VHeader,
      PlanList,
      AnalysisSettings: () => import('components/analysis-settings/analysis-settings')
    },
    watch: {},
    methods: {
      ...mapMutations({
        setModifyItem: 'analysis/SET_MODIFY_ITEM',
        setSelectedItem: 'analysis/SET_SELECTED_ITEM'
      }),
      showLoading (boolean) {
        this.isShowLoading = boolean
      },
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
          case 'tenderProduct': {
            obj.tag = 3
            return await this._createAnalysisPlan(obj)
          }
          case 'tenderCompany': {
            obj.tag = 4
            return await this._createAnalysisPlan(obj)
          }
          default: {
            return await ''
          }
        }
      },
      _selectedItem (item) {
        this.setSelectedItem(item)
        this.$router.push(`/analysis/${this.analysisItem}/${item.id}`)
      },
      _modifyPlan (item) {
        this.setModifyItem(item)
        this.showSettings()
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
        }).join('、') + '的对比分析'
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
              this.hideSettings()
            }
          })
      },
      async _modifyAnalysisPlan ({ startTime, endTime, selectedItems }) {
        const planTitle = selectedItems.map(item => {
          return item.name
        }).join('、') + '的对比分析'
        const params = {
          id: this.modifyItem.id,
          tag: this.modifyItem.tag,
          q: JSON.stringify(selectedItems),
          name: planTitle, // 计划名,
          endPoTime: endTime + ' 23:59:59',
          startPoTime: startTime + ' 00:00:00'
        }
        return await modifyAnalysisPlan(params)
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
                text: '修改成功',
                time: 500,
                type: 'success'
              })
              this.hideSettings()
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
          case 'tenderProduct': {
            params.tag = 3
            return await getAnalysisPlan(params)
          }
          case 'tenderCompany': {
            params.tag = 4
            console.log(params.tag)
            return await getAnalysisPlan(params)
          }
          default: {
            return await ''
          }
        }
      },
      async _getRecommendTagAnalysisPlan () {
        let tag
        switch (this.analysisItem) {
          case 'company': {
            tag = 1
            return await this._getRecommendAnalysisPlan(tag)
          }
          case 'product': {
            tag = 2
            return await this._getRecommendAnalysisPlan(tag)
          }
          case 'tenderProduct': {
            tag = 3
            return await this._getRecommendAnalysisPlan(tag)
          }
          case 'tenderCompany': {
            tag = 4
            return await this._getRecommendAnalysisPlan(tag)
          }
          default: {
            return await ''
          }
        }
      },
      async _getRecommendAnalysisPlan (tag) {
        const params = {
          tag
        }
        this.showLoading(true)
        return await getRecommendAnalysisPlan(params).then(data => {
          if (data.code === ERR_OK) {
            this.showLoading(false) // 当没设置推荐计划同时又没设置个人计划时关闭loading
            return data
          }
        })
      },
      hideSettings () {
        this.showSetting = false
//        this.$refs.analysisSettings.hide()
      },
      showSettings () {
        this.showSetting = true
//        this.$refs.analysisSettings.show()
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
      async _getTenderProductsClassify () {
        const params = {
        }
        return await getTenderProductsClassify(params).then(data => {
          if (data.code === ERR_OK) {
            return data
          }
        })
      },
      async _getTenderCompanyClassify () {
        const params = {
        }
        return await getTenderCompanyClassify(params).then(data => {
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
          case 'tenderProduct': {
            return await this._getTenderProductsClassify()
          }
          case 'tenderCompany': {
            return await this._getTenderCompanyClassify()
          }
          default: {
            return await ''
          }
        }
      },
      async _concurrent () {
        if (!this.analysisItem) this.$router.push('/analysis')
        const data = await Promise.all([this._getClassify(this.analysisItem), this._getAnalysisPlan(), this._getRecommendTagAnalysisPlan()])

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
          case 'tenderProduct': {
            return '产品招标分析'
          }
          case 'tenderCompany': {
            return '企业招标分析'
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
