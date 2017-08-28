<template>
  <div class="search">
    <v-header title="搜索"></v-header>
    <div class="search-input-wrapper">
      <search-input
        @searchQuery="searchQuery"
        @clearQuery="clearQuery"
        @queryChange="onQueryChange"
        ref="searchInput">
      </search-input>
    </div>
    <div v-show="!query && searchHistory.length" class="search-history-wrapper">
      <scroll class="search-history" :data="searchHistory" :refreshDelay="120" ref="searchHistory">
        <div>
          <h1 class="title">
            <span class="text">搜索历史</span>
            <div class="clear" @click="showClearConfirm">
              <i class="icon iconfont icon-delete"></i>
            </div>
          </h1>
          <search-list 
            :searchHistory="searchHistory" 
            @delete="deleteSearchHistory($event)"
            @select="selectAndSearchHistory($event)"></search-list>
        </div>
      </scroll>
      <div class="confirm">
        <confirm 
          v-model="isShowClear" 
          :title="'是否清空搜索历史'"
          @on-cancel="isShowClear=false"
          @on-confirm="clearSearchHistory">
        </confirm>
      </div>
    </div>
    <div class="list-wrapper" v-show="query">
      <list :list="list" 
            :pullup="pullup"
            :hasMore="hasMore"
            :isShowBlock="isShowBlock"
            :isShowLoading="isShowLoading"
            :listenScroll="listenScroll"
            :probeType="probeType"
            @scroll="blurInput"
            @refresh="" 
            @loadMore="_loadMore" 
            @selectItem="selectItem"
            ref="list">
      </list>
      <div class="no-result" v-show="!hasResult">
        <span>无搜索内容</span>
      </div>
    </div>
  </div>
</template>

<script>
  import List from 'base/list/list'
  import Scroll from 'base/scroll/scroll'
  import VHeader from 'components/v-header/v-header'
  import SearchList from 'base/search-list/search-list'
  import SearchInput from 'base/search-input/search-input'
  import { Confirm } from 'vux'
  import { getSearch } from 'api'
  import { ERR_OK } from 'api/config'
  import { mapActions, mapGetters } from 'vuex'
  import { listLoadMixin } from 'common/js/mixin'
  
  export default {
    name: 'search',
    mixins: [listLoadMixin],
    data () {
      return {
        list: [],
        page: 1,
        hasMore: true,
        pullup: true,
        isShowBlock: false,
        query: '',
        isShowLoading: false,
        listenScroll: true,
        probeType: 2,
        hasResult: true,
        isShowClear: false
      }
    },
    computed: {
      ...mapGetters([
        'searchHistory'
      ])
    },
    components: {
      List,
      Scroll,
      Confirm,
      VHeader,
      SearchList,
      SearchInput
    },
    watch: {
      query (newQuery, oldQuery) {
        if (!newQuery) {
          this.clearQuery()
          this.$nextTick(() => {
            this.$refs.searchHistory.refresh()
          })
        }
      }
    },
    methods: {
      showClearConfirm () {
        this.isShowClear = true
      },
      onQueryChange (query) {
        this.query = query
      },
      blurInput () {
        this.$refs.searchInput.blur()
      },
      clearQuery () {
        this.list = []
        this.page = 1
        this.query = ''
        this.hasSearchResult(true)
        this.showLoading(false)
      },
      _setQuery (query) {
        this.$refs.searchInput.setQuery(query)
      },
      searchQuery (query) {
        if (!query) return
        this.list = []
        this.page = 1
        this.query = query
        this.hasSearchResult(true)
        this._getSearch()
      },
      selectAndSearchHistory (query) {
        this._setQuery(query)
        this.searchQuery(query)
      },
      loadMore () {
        this.page += 1
        const params = {
          'query.q': this.query,
          limit: 15,
          currentPage: this.page
        }
        getSearch(params).then(data => {
          if (data.code === ERR_OK) {
            this.list = this.list.concat(data.list)
          }
        })
      },
      selectItem (item) {
        this.fetchDetail(item)
      },
      _getSearch () {
        const params = {
          'query.q': this.query,
          limit: 15,
          currentPage: this.page
        }
        this.saveSearchHistory(this.query)
        this.showLoading(true)
        getSearch(params).then(data => {
          if (data.code === ERR_OK) {
            this.list = data.list
            this.showLoading(false)
            if (!data.list.length) this.hasSearchResult(false)
          }
        })
      },
      hasSearchResult (boolean) {
        this.hasResult = boolean
      },
      showLoading (boolean) {
        this.isShowLoading = boolean
      },
      ...mapActions([
        'fetchDetail',
        'saveSearchHistory',
        'clearSearchHistory',
        'deleteSearchHistory'
      ])
    },
    created () {
    },
    mounted () {
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~stylus-px2rem/index"
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  html-font-size = 75px;

  .search
    // position fixed
    // top 0
    // bottom 120px
    flex-grow: 1
    overflow: hidden
    width 100%
    height calc(100% - 48px)
    background-color $color-background
    .list-wrapper
      position relative
      height calc(100% - 2.646667rem)
      .no-result
        width 100%
        color $color-theme
        text-align center
        position absolute
        top 50%
        left 50%
        transform translate3d(-50%, -50%, 0)
    .search-history-wrapper
      position fixed
      width 100%
      left 0
      right 0
      top 2.6375rem
      bottom 1.61rem
      z-index 50
      background-color $color-background
      .search-history
        height calc(100%)
        overflow hidden
        > div
          padding-top 0.8rem
          .title
            display flex
            justify-content space-between
            padding 8px 50px
            .clear
              extend-click()
            .text,
            .clear > .icon-delete
              font-weight 800
              color $color-text
              font-size $font-size-medium * 2
</style>
