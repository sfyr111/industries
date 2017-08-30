<template>
  <div class="home">
    <v-header title="首页" :close="true" :back="back">
      <router-link tag="i" to="/user" class="user-icon" slot="right"></router-link>
    </v-header>
    <scroll class="info" :data="scrollData">
      <div v-show="size">
        <block></block>
        <hotspot :list="hotspotGroup" @select="selectItem" ref="hotspot"></hotspot>
        <tab-page :data="tenderGroup" @select="selectItem" title="招标信息" ref="tenderClassifyList"></tab-page>
        <tab-page :data="companyGroup" @select="selectItem" title="企业信息" ref="companyClassifyList"></tab-page>
        <rank :ranking="companyRank" title="企业竞争力排行" ref="companyRank"></rank>
        <tab-page :data="productsGroup" @select="selectItem" title="产品信息" ref="productsClassifyList"></tab-page>
        <rank :ranking="productsRank" title="产品竞争力排行" ref="productsRank"></rank>
      </div>
      <div class="loading-container" v-show="!size">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
  import vrv from 'common/js/vrv-jssdk'
  import VHeader from 'components/v-header/v-header'
  import TabPage from 'base/tab-page/tab-page'
  import Rank from 'base/rank/rank'
  import Hotspot from 'base/hotspot/hotspot'
  import Scroll from 'base/scroll/scroll'
  import Block from 'base/block/block'
  import Loading from 'base/loading/loading'
  import { mapGetters, mapActions } from 'vuex'
  import { ERR_OK } from 'api/config'
  import { getHotNews, getCompanyClassifyAndList, getProductsClassifyAndList, getTenderClassifyAndList, getCompanyRanking, getProductsRanking } from 'api'

  export default {
    name: 'home',
    mixins: [],
    data () {
      return {
        hotspotGroup: [],
        companyGroup: [{name: '标题', datas: [{title: '标题标题', poTime: '123'}]}],
        productsGroup: [{name: '标题', datas: [{title: '标题标题', poTime: '123'}]}],
        tenderGroup: [{name: '标题', datas: [{title: '标题标题', poTime: '123'}]}],
        companyRank: [],
        productsRank: []
      }
    },
    computed: {
      ...mapGetters([
        'firstLogin',
        'userId'
      ]),
      scrollData () {
        return [...this.hotspotGroup, ...this.companyGroup, ...this.productsGroup, ...this.tenderGroup, ...this.companyRank, ...this.productsRank]
      },
      size () {
        const arr = [
          this.hotspotGroup,
          this.companyGroup,
          this.productsGroup,
          this.tenderGroup,
          this.companyRank,
          this.productsRank
        ]
        return arr.every(item => item.length !== 0)
      }
    },
    components: {
      VHeader,
      TabPage,
      Rank,
      Hotspot,
      Scroll,
      Loading,
      Block
    },
    watch: {
      firstLogin (newValue) {
        if (!newValue) {
          this._concurrent()
        }
      }
    },
    methods: {
      back () {
        vrv.jssdk.closeView({})
      },
      selectItem (item) {
        this.fetchDetail(item)
      },
      async _concurrent () {
        const data = await Promise.all([
          this._getHotNews(),
          this._getCompanyClassifyAndList(),
          this._getProductsClassifyAndList(),
          this._getTenderClassifyAndList(),
          this._getCompanyRanking(),
          this._getProductsRanking()])

        const [{ list: hotspotGroup },
               { list: companyGroup },
               { list: productsGroup },
               { list: tenderGroup },
               { list: companyRank },
               { list: productsRank }] = data

        this.hotspotGroup = hotspotGroup
        this.companyGroup = companyGroup
        this.productsGroup = productsGroup
        this.tenderGroup = tenderGroup
        this.companyRank = companyRank
        this.productsRank = productsRank

        return data
      },
      async _getHotNews () {
        const params = {
          limit: 5
        }
        return await getHotNews(params).then(data => {
          if (data.code === ERR_OK) {
            return data
          }
        })
      },
      async _getCompanyClassifyAndList () {
        const params = {
          count: 4,
          limit: 5
        }
        return await getCompanyClassifyAndList(params).then(data => {
          if (data.code === ERR_OK) {
            return data
          }
        })
      },
      async _getProductsClassifyAndList () {
        const params = {
          count: 4,
          limit: 5
        }
        return await getProductsClassifyAndList(params).then(data => {
          if (data.code === ERR_OK) {
            return data
          }
        })
      },
      async _getTenderClassifyAndList () {
        const params = {
          count: 4,
          limit: 5
        }
        return await getTenderClassifyAndList(params).then(data => {
          if (data.code === ERR_OK) {
            return data
          }
        })
      },
      async _getCompanyRanking () {
        const params = {
          count: 5
        }
        return await getCompanyRanking(params).then(data => {
          if (data.code === ERR_OK) {
            return data
          }
        })
      },
      async _getProductsRanking () {
        const params = {
          count: 5
        }
        return await getProductsRanking(params).then(data => {
          if (data.code === ERR_OK) {
            return data
          }
        })
      },
      ...mapActions([
        'fetchDetail'
      ])
    },
    created () {
      if (!this.firstLogin) {
        this._concurrent()
      }
    },
    mounted () {}
  }
</script>

<style lang="stylus" scoped>
  @import "~stylus-px2rem/index"
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  html-font-size = 75px;

  .home
    flex-grow: 1
    overflow: auto
    width 100%
    height calc(100% - 48px)
    .info
      overflow hidden
      height calc(100% - 1.436667rem)
    i.user-icon
      extend-click()
      display inline-block
      width 72px
      height 72px
      background-size cover
      bg-image('按钮-设置')
  .loading-container
    position absolute
    width 100%
    top 50%
    transform translateY(-50%)
</style>
