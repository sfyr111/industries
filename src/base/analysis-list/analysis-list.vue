<template>
  <div class="analysis-list">
    <div class="list-item">
      <diV class="item-top">
        <div class="item-font">
          <span class="item-title">{{title}}</span>
          <p class="item-time">
            <span class="time-start">{{startTime}}</span>
            至
            <span class="time-end">{{endTime}}</span>
          </p>
        </div>
        <i class="item-icon"></i>
      </diV>
      <div class="item-btn">
        <div class="modify" @click="modifyItem">
          修改
        </div>
        <div class="delete" @click="deleteItem">
          删除
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'analysis-list',
  props: {
    title: {
      type: String,
      default: '北信源、360、启明星辰的对比分析'
    },
    startTime: {
      type: String,
      default: '2017-05-01'
    },
    endTime: {
      type: String,
      default: '2017-08-01'
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
      this.$emit('modifyItem')
    },
    deleteItem () {
      this.$emit('deleteItem')
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
  .analysis-list
    background #fff
    padding-top 20px
    .list-item
      border-top 0.026667rem solid #979797
      border-bottom 0.026667rem solid #979797
      .item-top
        height 149px
        display flex
        border-bottom 1px solid $color-border
        border-image: linear-gradient(#b2b2b2, transparent) 30 30;
        .item-font
          height 149px
          width 598px
          display flex
          flex-direction column
          justify-content center
          padding-left 22px
          .item-title
            font-size 33px
            font-weight 600
            margin-bottom 25px
          .item-time
            color $color-text-d
        .item-icon
          height 128px
          width 128px
          bg-image('img-推荐')
          background-size 100% 100%
      .item-btn
        height 88px
        display flex
        color $color-theme
        .modify
          width 374.5px
          display flex
          justify-content center
          align-items center
          border-right 1px solid #979797
        .delete
          width 374.5px
          display flex
          justify-content center
          align-items center
</style>
