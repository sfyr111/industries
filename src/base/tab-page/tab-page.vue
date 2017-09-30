<template>
  <div id="tab-page">
    <div class="title">
      <div class="title-left">
        {{title}}
      </div>
    </div>
    <div>
      <div class="tab-bar">
        <tab :line-width="2" active-color='#0B62C9' custom-bar-width="60px">
          <tab-item class="vux-center" @on-item-click="setmessage" :selected="tabSelected===item" v-for="(item,index) in tabItem" @click="tabselected=item" :key="index">{{item}}</tab-item>
        </tab>
      </div>
      <div class="conent-list">
        <div class="message-item" v-for="(item, index) in tabContent[idx].datas" :key="item.id" @click="selectItem(item)">
          <div class="message-conent" v-html="item.title"></div>
          <div class="message-time">
            {{item.poTime.slice(0, 10).replace(/-/g, '.')}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // on-setmessage:选项卡点击事件
  import { Tab, TabItem, Swiper, SwiperItem } from 'vux'

  export default {
    name: 'tabPage',
    props: {
      title: {
        type: String,
        default: '标题信息'
      },
      data: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        idx: 0
      }
    },
    computed: {
      tabItem () {
        let arr = this.data.map(item => {
          if (!item.datas.length) {
            return
          }
          return item.name
        }).filter(item => !!item)
        return arr
      },
      tabSelected () {
        return this.tabItem[0]
      },
      tabContent () {
//        return this.data.filter(item => item.datas.length) // 假数据过滤
        return this.data
      }
    },
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem
    },
    methods: {
      selectItem (item) {
        this.$emit('select', item)
      },
      setmessage (index) {
        this.idx = index
        this.$emit('on-setmessage', this.tabItem[index])
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~stylus-px2rem/index"
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  html-font-size = 75px;

  #tab-page
    margin-top 20px
  .title
    background $color-background
    height 100px
    display flex
    align-items center
    justify-content space-between
    padding 0px 25px
  .tab-bar
    border-bottom 0.026667rem solid #D9D9D9
    box-shadow 0.5px 0.5px 0.5px 0.5px #dfdfdf
  .conent-list
    background $color-background
    padding 0px 25px
    .message-item
      display flex
      // align-items center
      justify-content space-between
      height 79px
      line-height 79px
      border-top 0.026667rem solid #D9D9D9
      &:nth-child(1)
        border-top none
    .message-conent
      font-size 28px
      margin-right 3px
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
    .message-time
      white-space nowrap
      color #c6c6c6
      font-size 16px
</style>
