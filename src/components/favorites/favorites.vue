<template>
  <transition name="slide">
    <div class="favorites">
      <v-header title="收藏夹"></v-header>
      <scroll :data="list" class="content">
        <div>
          <block></block>
          <swipeout class="content-box">
            <swipeout-item transition-mode="follow" v-for="(item, index) in list" :key="item.id">
              <div slot="right-menu">
                <swipeout-button @click.native="deleteItem(item)" type="warn">删除</swipeout-button>
              </div>
              <div slot="content">
                <list-cell :item="item" @select="selectItem(item)"></list-cell>
              </div>
            </swipeout-item>
          </swipeout>
        </div>
        <div class="loading-container" v-show="isLoading">
          <loading></loading>
        </div>
        <div class="no-result" v-show="!list.length && !isLoading">
          <span>无收藏内容</span>
        </div>
      </scroll>
    </div>
  </transition>
</template>

<script>
  import Block from 'base/block/block'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import ListCell from 'base/list-cell/list-cell'
  import VHeader from 'components/v-header/v-header'
  import { ERR_OK } from 'api/config'
  import { getCollectArticles, deleteCollectArticles } from 'api'
  import { mapActions } from 'vuex'
  import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'

  export default {
    name: 'favorites',
    mixins: [],
    data () {
      return {
        list: [],
        isLoading: false
      }
    },
    computed: {},
    components: {
      Block,
      Scroll,
      VHeader,
      Loading,
      ListCell,
      Swipeout,
      SwipeoutItem,
      SwipeoutButton
    },
    watch: {},
    methods: {
      _getCollectArticles () {
        this.isLoading = true
        getCollectArticles().then(data => {
          if (data.code === ERR_OK) {
            this.list = data.list
            this.isLoading = false
            return data
          }
        })
      },
      _deleteCollectArticles (item) {
        const params = {
          id: item.id
        }
        deleteCollectArticles(params).then(data => {
          if (data.code === ERR_OK) {
            this.$vux.toast.show({
              text: '删除成功',
              time: 500,
              type: 'success'
            })
            const index = this.list.findIndex(value => {
              return item.id === value.id
            })
            this.list.splice(index, 1)
          }
        })
      },
      selectItem (item) {
        this.fetchDetail(item)
      },
      deleteItem (item) {
        this._deleteCollectArticles(item)
      },
      ...mapActions([
        'fetchDetail'
      ])
    },
    created () {
      this._getCollectArticles()
    },
    mounted () {}
  }
</script>

<style lang="stylus" scoped>
  @import "~stylus-px2rem/index"
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  html-font-size = 75px;

  .favorites
    position fixed
    top 0
    bottom 0
    width 100%
    background-color $color-background-d
    .content
      overflow hidden
      height calc(100% - 1.5rem)
      background $color-background-d
    .content-box
      min-height 1194px
      background $color-background
  .loading-container
    position absolute
    width 100%
    top 50%
    transform translateY(-50%)
  .no-result
    width 100%
    color $color-theme
    text-align center
    position absolute
    top 50%
    left 50%
    transform translate3d(-50%, -50%, 0)

  .slide-enter-active,
  .slide-leave-active
    transition all 0.3s
  .slide-enter,
  .slide-leave-to
    transform translate3d(100%, 0, 0)
</style>
