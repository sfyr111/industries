<template>
  <transition name="slide">
    <div class="analysis-option">
      <v-header :title="getTitle($route.params.item)" class="header">
        <div slot="right" class="setting-btn" @click="showSettigns">
          新建
        </div>
      </v-header>
      <analysis-settings :tabs="tabs"
      ref="analysisSettings"></analysis-settings>
    </div>
  </transition>
</template>

<script>
  import VHeader from 'components/v-header/v-header'
  import AnalysisSettings from 'components/analysis-settings/analysis-settings'
  import { mapGetters } from 'vuex'
  import { ERR_OK } from 'api/config'
  import { getCompanyClassify, getProductClassify, getTenderClassify } from 'api'

  export default {
    name: 'analysis-option',
    mixins: [],
    data () {
      return {
        tabs: []
      }
    },
    computed: {
      ...mapGetters([
        'analysisItem'
      ])
    },
    components: {
      VHeader,
      AnalysisSettings
    },
    watch: {},
    methods: {
      showSettigns () {
        this.$refs.analysisSettings.show()
      },
      async _getCompanyClassify () {
        const params = {
        }
        return await getCompanyClassify(params).then(data => {
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
            return await this._getCompanyClassify()
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
        const data = await Promise.all([this._getClassify(this.analysisItem)])

        const [{ list: tabs }] = data

        this.tabs = tabs

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
