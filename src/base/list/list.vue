<template>
  <scroll class="list"
          :data="list" 
          :pullup="pullup"
          :pulldown="pulldown"
          :probeType="$attrs.probeType"
          :listenScroll="$attrs.listenScroll"
          @scroll="$listeners.scroll"
          @scrollToTop="refresh"
          @scrollToEnd="loadMore">
    <div>
      <div class="top-loading" :class="reveal ? 'reveal' : ''" v-show="list.length">
        <loading v-show="hasRefresh"></loading>
      </div>
      <block v-show="isShowBlock"></block>
      <div class="content-wrapper">
        <slot></slot>
        <list-cell @select="selectItem(item)" :item="item" v-for="(item, index) in list" :key="item.id"></list-cell>
      </div>
      <loading v-show="hasMore && list.length"></loading>
    </div>
    <div class="loading-container" v-show="!list.length && isShowLoading">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import ListCell from 'base/list-cell/list-cell'
  import Loading from 'base/loading/loading'
  import Block from 'base/block/block'

  export default {
    name: 'list',
    mixins: [],
    props: {
      list: {
        type: Array,
        default: []
      },
      pullup: {
        type: Boolean,
        default: false
      },
      pulldown: {
        type: Boolean,
        default: false
      },
      hasMore: {
        type: Boolean,
        default: false
      },
      hasRefresh: {
        type: Boolean,
        default: false
      },
      // 下拉刷新loading站位
      reveal: {
        type: Boolean,
        default: false
      },
      // 显示站位block
      isShowBlock: {
        type: Boolean,
        default: true
      },
      // 增加list为空时loading条件
      isShowLoading: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
      }
    },
    computed: {},
    components: {
      Block,
      Scroll,
      Loading,
      ListCell
    },
    watch: {},
    methods: {
      refresh () {
        this.$emit('refresh')
      },
      loadMore () {
        this.$emit('loadMore')
      },
      selectItem (item) {
        this.$emit('selectItem', item)
      }
    },
    created () {
    },
    mounted () {}
  }
</script>

<style lang="stylus" scoped>
  @import "~stylus-px2rem/index"
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  html-font-size = 75px;

  .list
    height 100%
    overflow hidden
    background-color $color-background-d
    .content-wrapper
      min-height 16rem
      background-color $color-background
  .loading-container
    position absolute
    width 100%
    top 50%
    transform translateY(-50%)
  .top-loading
    position absolute
    left 0
    right 0
    top -1.125rem
    width 100%
    height 1.0625rem
  .top-loading.reveal
    position inherit
</style>
