<template>
  <div class="search-list">
    <transition-group name="list" tag="ul">
      <li v-for="(item, index) in searchHistory" :key="item">
        <span class="text" @click="searchHistoryItem(item)">{{item}}</span>
        <div class="close" @click="deleteSearchHistory(item)">
          <i class="icon iconfont icon-close"></i>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll'

  export default {
    name: 'search-list',
    mixins: [],
    props: {
      searchHistory: {
        type: Array,
        default: []
      }
    },
    data () {
      return {}
    },
    computed: {},
    components: {
      Scroll
    },
    watch: {},
    methods: {
      deleteSearchHistory (item) {
        this.$emit('delete', item)
      },
      searchHistoryItem (item) {
        this.$emit('select', item)
      }
    },
    created () {},
    mounted () {}
  }
</script>

<style lang="stylus" scoped>
  @import "~stylus-px2rem/index"
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  html-font-size = 75px;

  .search-list
    ul
      > li
        padding 0.306667rem 0.666666666666667rem
        display flex
        justify-content space-between
        .close
          extend-click()
        .text
          width 50%
          no-wrap()
        .text,
        .close > .icon-close
          color $color-text
          font-size $font-size-medium-x * 2
  .list-enter-active,
  .list-leave-active 
    transition all 0.1s
  .list-enter,
  .list-leave-to
    opacity 0
    height 0
</style>
