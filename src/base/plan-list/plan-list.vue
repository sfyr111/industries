<template>
  <scroll class="plan-list" :data="list">
    <div>
      <block></block>
      <div class="list">
        <plan-item v-on="$listeners" v-for="(item, index) in planList" :item="item" :key="item.id"></plan-item>
      </div>
      <div class="list">
        <plan-item v-on="$listeners" v-for="(item, index) in recommendPlanList" :item="item" :key="item.id"></plan-item>
      </div>
    </div>
    <div class="loading-container" v-show="!list.length && isShowLoading">
      <loading></loading>
    </div>
    <!--<div class="no-result" v-show="!list.length && !isLoading">-->
      <!--<span>还没创建分析计划</span>-->
    <!--</div>-->
  </scroll>
</template>

<script>
  import Block from 'base/block/block'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import PlanItem from 'base/plan-item/plan-item'

  export default {
    name: 'plan-list',
    mixins: [],
    props: {
      planList: {
        type: Array,
        default: []
      },
      recommendPlanList: {
        type: Array,
        default: []
      },
      // 增加推荐计划为空时loading条件
      isShowLoading: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        isLoading: false
      }
    },
    computed: {
      list () {
        const list = [...this.planList, ...this.recommendPlanList]
        return list
      }
    },
    components: {
      Block,
      Scroll,
      Loading,
      PlanItem
    },
    methods: {},
    created () {},
    mounted () {}
  }
</script>

<style scoped lang="stylus">
  @import "~stylus-px2rem/index"
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  html-font-size = 75px;

  .plan-list
    height 16.4rem
    overflow hidden
    background-color $color-background-d

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
</style>
