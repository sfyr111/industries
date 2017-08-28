<template>
  <div id='hotspot'>
    <div class="hotTitle">
      <div class="hotTitle-left">{{title}}</div>
      <!-- 更多 -->
      <!-- <div class="hotTitle-right"></div> -->
    </div>
    <ul class="hotList">
      <li class="hotItem" v-for="(item, index) in list" @click="selectItem(item)" :key="item.id">
        <!-- 分类 按钮 -->
        <!--<span class="hotClassify">#{{item.key}}#</span>-->
        <span class="hotConent" v-html="item.title"></span>
      </li>
    </ul>
  </div>
</template>

<script>
  import { Cell, Group } from 'vux'

  export default {
    name: 'hotspot',
    props: {
      list: {
        type: Array,
        default () {
          return []
        }
      },
      title: {
        type: String,
        default: '最新热点'
      }
    },
    components: {
      Cell,
      Group
    },
    methods: {
      selectItem (item) {
        this.$emit('select', item)
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~stylus-px2rem/index"
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  html-font-size = 75px;

  #hotspot
    // margin-top 20px
  .hotTitle
    background $color-background
    height 100px
    display flex
    align-items center
    justify-content space-between
    padding 0px 25px
    border-bottom 0.026667rem solid #D9D9D9
    box-shadow 0.5px 0.5px 0.5px 0.5px #dfdfdf
    >.hotTitle-right
      width 86px
      height 86px
      // background url('~common/image/more@2x.png') 
      background-size 100% 100%
  .hotList
    padding 0 25px
    background $color-background
    >.hotItem
      height 79px
      border-top 0.026667rem solid #D9D9D9
      // display flex
      // align-items center
      line-height 79px
      padding 0px 25px
      // >.hotClassify
      //   white-space nowrap
      //   color #0B62C9
      //   margin-right 6px
      &:nth-child(1)
        border-top none
      >.hotConent
        font-size 28px
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
</style>
