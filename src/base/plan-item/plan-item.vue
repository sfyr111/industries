<template>
   <div class="plan-item">
      <div class="list-left" v-show="item.recomand"></div>
      <div class="list-content" :class="{'list-item-silde': !item.recomand}">
        <div class="item-title">
          <section>
            <span class="recommend" v-show="item.recomand">【推荐】</span>
            <span class="title-font">{{item.name}}</span>
          </section>
          <i class="title-icon"></i>
        </div>
        <div class="item-time">
          <span class="time-start">开始时间:&nbsp;{{item.startPoTime | formatDate }}</span>
          <span class="time-end">结束时间:&nbsp;{{item.endPoTime | formatDate }}</span>
        </div>
        <div class="item-button">
          <p class="button-default button-color" v-show="!item.recomand" @click="modifyItem">修改</p>
          <p class="button-default" v-show="!item.recomand" @click="deleteItem">删除</p>
        </div>
      </div>
   </div>
</template>

<script>
  import { dateFormat } from 'vux'

  export default {
    name: 'plan-item',
    props: {
      item: {
        type: Object,
        default: ''
      }
    },
    mixins: [],
    data () {
      return {}
    },
    computed: {},
    components: {},
    watch: {},
    methods: {
      modifyItem () {
        this.$emit('modifyPlan')
      },
      deleteItem () {
        this.$emit('deletePlan', this.item.id)
      }
    },
    filters: {
      formatDate: function (date) {
        return dateFormat(date, 'YYYY-MM-DD')
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

  .plan-item
    background #fff
    margin 0 0 20px 0
    display flex
    //height 238px
    .list-left
      width 8px
      background #FF0000
    .list-content
      width 742px
      padding 0 20px 0 15px
    .list-item-silde
      padding-left 20px
    .item-title
      display flex
      align-items center
      justify-content space-between
      padding-right 20px
      height 70px
      // font-size 30px
      > section
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        width 7rem
      .recommend
        color red
      .title-icon
        width 40px
        height 60px
        extend-click()
        display inline-block
        line-height 60px
        background-size cover
        bg-image('按钮-返回')
    .item-time
      font-size 26px
      color $color-text-d
      padding 15px 0px
      .time-start
        margin-right 20px
    .item-button
      display flex
      height 102px
      justify-content flex-end
      align-items center
      .button-default
        width 122px
        height 62px
        color #4799FE
        background #fff
        display flex
        align-items center
        justify-content center
        border 1px solid #4799FE
        box-sizing border-box
        border-radius 8px
        &.button-color
          color #fff
          background #4799FE
          margin-right 20px
</style>
