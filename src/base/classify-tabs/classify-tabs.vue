<template>
  <div class="classify-tabs">
    <div class="checker-box">
      <checker v-model="selectedItem" type="checkbox" default-item-class="default-item" selected-item-class="selected-item">
        <checker-item :value="item" v-for="( item , index ) in checkerItem" :key="index" @on-item-click="onItemClick">{{item.name}}</checker-item>
      </checker>
    </div>
    <div class="selected-box">
      <selected-enterprise :selectedItem = "selectedItem"></selected-enterprise>
    </div>
  </div>
</template>

<script>
  import { Checker, CheckerItem } from 'vux'
  import SelectedEnterprise from 'base/selected-classify-tabs/selected-classify-tabs'

  export default {
    name: 'classify-tabs',
    props: {
      checkerItem: {
        type: Array,
        defalut: []
      }
    },
    data () {
      return {
        selectedItem: []
      }
    },
    computed: {},
    components: {
      Checker,
      CheckerItem,
      SelectedEnterprise
    },
    watch: {},
    methods: {
      onItemClick () {
        this.$nextTick(() => {
          this.$emit('selectedItem', this.selectedItem)
        })
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

  .classify-tabs
    background #ffffff
    .checker-box
      margin-top 50px
      background #fff
      min-height 200px
      max-height 9rem
      overflow-y auto
      border-top 1px solid #e8e8e8
      border-image: linear-gradient(#e8e8e8, transparent) 30 30
    .vux-checker-box
      height 9rem
      display flex
      flex-wrap wrap
      align-content flex-start
      border-bottom 1px solid #e8e8e8
      border-image: linear-gradient(transparent, #e8e8e8) 30 30
    .default-item
      width 160px
      height 60px
      background #EFEFEF
      color #7b7b7b
      font-size 30px
      display inline-flex
      justify-content center
      align-items center
      margin-top 20px
      margin-bottom 20px
      margin-left 10px
      margin-right 10px
      border-radius 7px
    .selected-item
      box-sizing border-box
      height 60px
      border 2px solid #4799FE
      color #4799FE
      background #ffffff
    .selected-box
      height 250px
</style>
