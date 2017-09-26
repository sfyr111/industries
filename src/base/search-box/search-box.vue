<template>
  <div id="search-box">
    <div class="search-box">
      <i class=""></i>
      <input ref="query" type="text" class="box" v-model="query" :placeholder="'搜索关键字'" @keyup.enter="search" @input="queryChange" @focus="win">
      <i @click="clear" v-show="query" class="icon iconfont icon-close"></i>
    </div>
  </div>
</template>

<script>
  import { debounce } from 'common/js/util'

  export default {
    name: 'search-box',
    props: {
    },
    data () {
      return {
        query: ''
      }
    },
    computed: {},
    components: {},
    watch: {},
    methods: {
      win () {
        console.log(navigator.userAgent)
      },
      setQuery (query) {
        this.query = query
      },
      clear () {
        this.query = ''
        this.$emit('clearQuery', this.query)
      },
      search () {
        this.blur()
        this.$emit('searchQuery', this.query)
      },
      focus () {
        this.$refs.query.focus()
      },
      blur () {
        this.$refs.query.blur()
      },
      queryChange: debounce(function () {
        this.$emit('queryChange', this.query)
      })
    },
    created () {},
    mounted () {
    }
  }
</script>

<style scoped lang="stylus">
  @import "~stylus-px2rem/index"
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  html-font-size = 75px;

  #search-box
    display flex
  .search-box
    height 88px
    width 750px
    display flex
    position relative
    justify-content center
    align-items center
    background $color-background
    border-bottom 3px solid #dfdfdf
    input
      font-size $font-size-medium-x * 2
      width 570px
      height 62px
      padding 0 25px
      padding-left 50px
      border-radius 28px
      border 2px solid #ECECEC
    i:first-child
      height 43px
      width 43px
      position absolute
      top .3rem
      left 55px
      bg-image('菜单-搜索-默认')
      background-size 100% 100%
    i.icon-close
      position absolute
      top .4rem
      right 10px
      color $color-text-d
  ::-webkit-input-placeholder
    font-size $font-size-medium-x * 2
    color $color-text-d
</style>
