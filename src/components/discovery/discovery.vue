<template>
  <div class="discovery">
    <v-header title="发现" ref="discoveryHeader"></v-header>
    <div class="list-wrapper">
      <list :list="list"
            :pullup="pullup"
            :pulldown="pulldown"
            :hasMore="hasMore"
            :hasRefresh="hasRefresh"
            :reveal="reveal"
            :probeType="probeType"
            :listenScroll="listenScroll"
            @scroll="_ShowMinTab"
            @refresh="_refresh"
            @loadMore="_loadMore"
            @selectItem="selectItem"
            ref="list">
        <discovery-tab @selectTrend="selectTrend" ref="discoveryTab"></discovery-tab>
      </list>
      <discovery-min-tab v-show="showMinTab" ref="discoveryMinTab"></discovery-min-tab>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import List from 'base/list/list'
  import VHeader from 'components/v-header/v-header'
  import DiscoveryTab from 'components/discovery-tab/discovery-tab'
  import DiscoveryMinTab from 'components/discovery-min-tab/discovery-min-tab'
  import { getHotNews } from 'api'
  import { ERR_OK } from 'api/config'
  import { mapActions, mapGetters } from 'vuex'
  import { listLoadMixin } from 'common/js/mixin'

  export default {
    name: 'discovery',
    mixins: [listLoadMixin],
    data () {
      return {
        list: [],
        page: 1,
        hasMore: true,
        hasRefresh: true,
        pullup: true,
        pulldown: true,
        reveal: false,
        probeType: 3,
        listenScroll: true,
        showMinTab: false
      }
    },
    computed: {
      ...mapGetters([
        'discoveryItem'
      ])
    },
    components: {
      List,
      VHeader,
      DiscoveryTab,
      DiscoveryMinTab
    },
    watch: {},
    methods: {
      _ShowMinTab ({ y }) {
        const sitckyH = this.sitckyEl.getBoundingClientRect().top + window.pageYOffset - document.documentElement.clientTop
        const headerH = this.headerEl.clientHeight
        if (sitckyH <= headerH) {
          this.showMinTab = true
        } else {
          this.showMinTab = false
        }
      },
      selectTrend (item) {
      },
      selectItem (item) {
        this.fetchDetail(item)
      },
      loadMore () {
        this.page += 1
        const params = {
          limit: 30,
          currentPage: this.page
        }
        getHotNews(params).then(data => {
          if (data.code === ERR_OK) {
            this.list = this.list.concat(data.list)
          }
        })
      },
      refresh () {
        this.page = 1
        this.reveal = true
        const params = {
          limit: 30,
          currentPage: this.page
        }
        getHotNews(params).then(data => {
          if (data.code === ERR_OK) {
            this.reveal = false // 站位
            this.list = data.list
          }
        })
      },
      async _getHotNews () {
        const params = {
          limit: 30,
          currentPage: this.page
        }
        return await getHotNews(params).then(data => {
          if (data.code === ERR_OK) {
            this.list = data.list
            return data
          }
        })
      },
      ...mapActions([
        'fetchDetail',
        'saveVisitedList'
      ])
    },
    created () {
      this._getHotNews()
    },
    mounted () {
      this.sitckyEl = this.$refs.discoveryTab.$el.querySelector('.discovery-tab-icon')
      this.headerEl = this.$refs.discoveryHeader.$el
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~stylus-px2rem/index"
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  html-font-size = 75px;

  .discovery
    flex-grow: 1
    overflow: auto
    width 100%
    height calc(100% - 48px)
    background-color $color-background-d
    .list-wrapper
      position relative
      height calc(100% - 1.446667rem)
</style>
