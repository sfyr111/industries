<template>
  <transition name="inUp">
    <div id="detail" v-show="detailShowFlag">
      <v-header title="文章详情" :back="hide">
        <i slot="right" class="menu-button" @click="showMenuMod"></i>
      </v-header>
      <scroll :data="[detail]" class="content">
        <div class="">
          <block></block>
          <div class="content-box">
            <div class="content-title">
              <span>
                {{detail.title}}
              </span>
            </div>
            <div class="content-source">
              <span class="content-web">
                {{detail.author}}
              </span>
              <span class="content-time">
                {{detail.poTime}}
              </span>
            </div>
            <div class="content-body" v-html="detail.content">
              <!-- 这里有特殊标签 -->
            </div>
            <div class="content-foort">
              <div class="ft-left">
                <!-- <span @click="goUrl(detail.url)">阅读原文</span> -->
                <!--<span @click="copy(detail.url)">复制链接</span>-->
              </div>
             <!-- <div class="ft-right">
                <div class="zhan">
                  <i></i>
                  <span>(0)</span>
                </div>
                <div class="cai">
                  <i></i>
                  <span>(0)</span>
                </div>
              </div> -->
            </div>
          </div>
        </div>
        <div class="loading-container" v-show="!detail">
          <loading></loading>
        </div>
      </scroll>
      <actionsheet v-model="showMod" :menus="modMenus"  @on-click-menu="clickMenu">
      </actionsheet>
    </div>
  </transition>
</template>

<script>
  import vrv from 'common/js/vrv-jssdk'
  import Block from 'base/block/block'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import VHeader from '@/components/v-header/v-header.vue'
  import { Actionsheet } from 'vux'
  import { ERR_OK } from 'api/config'
  import { saveCollectArticles, judgeCollectArticles } from 'api'
  import { mapGetters, mapMutations, mapActions } from 'vuex'

  export default {
    name: 'detail',
    mixins: [],
    props: {
      detail: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        showMod: false,
        menus: {},
        isFavorite: false
      }
    },
    computed: {
      modMenus () {
        return this.isFavorite ? {
//          forwardButton: '转发',
          wumaohoutai: '已收藏',
          copyUrl: '复制链接'
        } : {
//          forwardButton: '转发',
          collectButton: '收藏',
          copyUrl: '复制链接'
        }
      },
      ...mapGetters([
        'detailShowFlag'
      ])
    },
    components: {
      Block,
      Scroll,
      Loading,
      VHeader,
      Actionsheet
    },
    watch: {
    },
    methods: {
      hide () {
        this.closeDetail()
      },
      showMenuMod () {
        this.showMod = true
        this._judgeCollectArticles(this.detail.id)
      },
      clickMenu (menu) { // 收藏或转发
        // if (menu === 'forwardButton') this.forward()
        if (menu === 'collectButton') this.collect()
        if (menu === 'copyUrl') this.copy(this.detail.url)
      },
      collect () {
        this._saveCollectArticles()
      },
      goUrl (url) {
        vrv.jssdk.showNavigationBar({ show: true })
        setTimeout(window.location.href = url, 500)
      },
      copy (url) {
        vrv.jssdk.copyTextToPaste({ url })
      },
      _saveCollectArticles () {
        const params = {
          url: this.detail.url,
          title: this.detail.title,
          articleId: this.detail.id,
          webSite: this.detail.webSite
        }
        saveCollectArticles(params).then(data => {
          if (data.code === ERR_OK) {
            this.$vux.toast.show({
              text: '收藏成功',
              time: 500,
              type: 'success'
            })
          }
        })
      },
      _judgeCollectArticles (id) {
        const params = {
          articleId: id
        }
        judgeCollectArticles(params).then(data => {
          if (data.code === ERR_OK) {
            if (data.obj) this.isFavorite = true
            else this.isFavorite = false
          }
        })
      },
      vrvReady () {
        vrv.ready(() => {
          try {
            vrv.jssdk.showNavigationBar({ show: false })
          } catch (err) {
            console.log(err)
          }
        })
      },
      ...mapMutations({
        'toggleDetailPage': 'TOGGLE_DETAIL_PAGE'
      }),
      ...mapActions([
        'closeDetail'
      ])
    },
    created () {
      this.vrvReady()
    },
    mounted () {
    }
  }
</script>

<style scoped lang="stylus">
  @import "~stylus-px2rem/index"
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  html-font-size = 75px;

  #detail
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background-color: #fff;
    .menu-button
      display block
      width 72px
      height 72px
      bg-image('按钮-拖动符')
      background-size 100% 100%
    .content
      overflow hidden
      height calc(100% - 1.5rem)
      background $color-background-d
      .content-box
        /*min-height 1194px*/
        padding 10px 50px
        background $color-background
      .content-title
        min-height 100px
        display flex
        justify-content center
        align-items center
        span
          font-weight bold
          font-size $font-size-large-x * 2
          line-height 45px
      .content-source
        height 45px
        display flex
        align-items center
        font-size $font-size-small * 2
        .content-web
          color $color-text-l
          margin-right 30px
        .content-time
          color $color-text-l
      .content-body
        min-height 13rem
        font-size $font-size-medium * 2
        color $color-text
        line-height 45px
        margin-top 10px
        margin-bottom 35px
        text-indent 2em
      .content-foort
        display flex
        justify-content space-between
        font-size $font-size-small * 2
        .ft-left
          span
            color $color-theme
            margin-right 25px
            extend-click()
        .ft-right
          display flex
    .zhan i,.cai i
      display flex
      width 40px
      height 40px
      margin-left 20px
      background-size 100% 100%
      extend-click()
    .zhan,.cai
      display flex
      align-items center
    .zhan i
      bg-image('图标-赞')
    .cai i
      bg-image('图标-踩')
  .inUp-enter-active,
  .inUp-leave-active
    transition all 0.3s
  .inUp-enter,
  .inUp-leave-to
    transform translate3d(0, 100%, 0)
  .loading-container
    position absolute
    width 100%
    top 50%
    transform translateY(-50%)
</style>
