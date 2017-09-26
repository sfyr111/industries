<template>
  <transition name="slide">
    <div class="dynamic-detail">
      <v-header :title="dynamicItem.title" class="header"></v-header>
      <div class="list-wrapper">
        <list :list="list"
              :pullup="pullup"
              :pulldown="pulldown"
              :hasMore="hasMore"
              :hasRefresh="hasRefresh"
              :reveal="reveal"
              @scroll=""
              @refresh="_refresh"
              @loadMore="_loadMore"
              @selectItem="selectItem">
      <!-- <sort></sort> -->
        </list>
      </div>
    </div>
  </transition>
</template>

<script>
  import VHeader from 'components/v-header/v-header'
  import Scroll from 'base/scroll/scroll'
  import ListCell from 'base/list-cell/list-cell'
  import Loading from 'base/loading/loading'
  // import Sort from 'components/sort/sort'
  import List from 'base/list/list'
  import { mapGetters, mapActions } from 'vuex'
  import { getIndustryTrend, getCompanyTrend, getProductTrend, getTenderTrend } from 'api'
  import { ERR_OK } from 'api/config'
  import { listLoadMixin } from 'common/js/mixin'

  export default {
    name: 'dynamic-detail',
    mixins: [listLoadMixin],
    data () {
      return {
        list: [],
        page: 1,
        hasMore: true,
        hasRefresh: true,
        pullup: true,
        pulldown: true,
        reveal: false
      }
    },
    computed: {
      ...mapGetters([
        'dynamicItem',
        'discoveryItem'
      ])
    },
    components: {
      // Sort,
      List,
      Scroll,
      VHeader,
      Loading,
      ListCell
    },
    watch: {},
    methods: {
      async _getIndustryTrend (params) {
        return await getIndustryTrend(params).then(data => {
          if (data.code === ERR_OK) {
            return data
          }
        })
      },
      async _getCompanyTrend (params) {
        return await getCompanyTrend(params).then(data => {
          if (data.code === ERR_OK) {
            return data
          }
        })
      },
      async _getProductTrend (params) {
        return await getProductTrend(params).then(data => {
          if (data.code === ERR_OK) {
            return data
          }
        })
      },
      async _getTenderTrend (params) {
        return await getTenderTrend(params).then(data => {
          if (data.code === ERR_OK) {
            return data
          }
        })
      },
      async _getTrend (item) {
        const params = {
          limit: 20,
          currentPage: this.page,
          tag: this.dynamicItem.tag
        }
        switch (item) {
          case 'industry': {
            return await this._getIndustryTrend(params)
          }
          case 'company': {
            return await this._getCompanyTrend(params)
          }
          case 'product': {
            return await this._getProductTrend(params)
          }
          case 'tender': {
            return await this._getTenderTrend(params)
          }
          default: {
            return await ''
          }
        }
      },
      loadMore () {
        this.page += 1
        this.hasMore = true
        this._getTrend(this.discoveryItem).then(data => {
          if (data.code === ERR_OK) {
            this.list = this.list.concat(data.list)
          }
        })
      },
      refresh () {
        this.page = 1
        this.reveal = true
        // this.hasRefresh = true
        this._getTrend(this.discoveryItem).then(data => {
          if (data.code === ERR_OK) {
            this.reveal = false
            this.list = data.list
          }
        })
      },
      selectItem (item) {
        this.fetchDetail(item)
      },
      async _getDate () {
        if (!this.dynamicItem.tag) {
          this.$router.push('/discovery')
        }
        const data = await this._getTrend(this.discoveryItem)
        const { list } = data
        this.list = list
        return data
      },
      ...mapActions([
        'fetchDetail'
      ])
    },
    created () {
      this._getDate()
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~stylus-px2rem/index"
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  html-font-size = 75px;

  .dynamic-detail
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    z-index 100
    background-color #fff
    .header
      position relative
      z-index 2
    .list-wrapper
      height calc(100% - 1.44rem)
  .slide-enter-active,
  .slide-leave-active
    transition all 0.3s
  .slide-enter,
  .slide-leave-to
    transform translate3d(100%, 0, 0)
  .loading-container
    position absolute
    width 100%
    top 50%
    transform translateY(-50%)
</style>
