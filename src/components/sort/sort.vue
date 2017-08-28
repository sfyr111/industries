<template>
  <div class="sort-container">
    <div class="sort-item-wrapper">
      <div class="sort-item" @click="chooseType('time')" :class="{active: sortBy === 'time'}">
        <span>时间</span>
        <svg class="sort-icon" width="10" height="10">
          <polygon points="0,3 10,3 5,8"></polygon>
        </svg>
      </div>
      <transition name="showList" mode="out-in">
        <ul class="sort-option" v-show="sortBy === 'time'">
          <li>全部</li>
          <li>7天内</li>
          <li>30天内</li>
          <li>90天内</li>
        </ul>
      </transition>
      <div class="sort-item" @click="chooseType('sort')" :class="{active: sortBy === 'sort'}">
        <span>排序</span>
          <svg class="sort-icon" baseProfile="full" x="0" y="0" width="10" height="10">
            <polygon points="0,3 10,3 5,8"></polygon>
          </svg>
      </div>
      <transition name="showList" mode="out-in">
        <ul class="sort-option" v-show="sortBy === 'sort'">
          <li>时间正序</li>
          <li>时间倒序</li>
        </ul>
      </transition>
    </div>
    <transition name="modal">
      <div class="modal" v-show="sortBy"></div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'sort',
    data () {
      return {
        sortBy: ''
      }
    },
    computed: {},
    components: {},
    watch: {},
    methods: {
      chooseType (type) {
        if (this.sortBy === type) {
          this.sortBy = ''
          return
        }
        this.sortBy = type
      }
    }
  }
</script>

<style lang="stylus">
  @import "~stylus-px2rem/index"
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  html-font-size = 75px;

  .sort-container
    .sort-item-wrapper
      font-size $font-size-small * 2
      display flex
      justify-content space-around
      text-align center
      align-items center
      border-bottom 1px solid $color-border
      border-image linear-gradient($color-border, transparent) 30 30
      position relative
      .sort-item
        padding 20px 0
        flex-grow 1
        position relative
        z-index 2
        background-color $color-background
        svg
          vertical-align middle
          transform rotate(0deg)
        &.active
          color $color-theme
          svg
            transition transform 0.3s
            color $color-theme
            transform rotate(-180deg)
            fill $color-theme
      &::after
        display block
        content ''
        height 34px
        width 1px
        background-color $color-border
        position absolute
      .sort-option
        display flex
        flex-direction column
        justify-content center
        background-color $color-background
        position: absolute
        top 0.85rem
        right: 0px
        left: 0px
        z-index 1
        text-align left
        > li
          padding 20px
          border-bottom 1px solid $color-border
          border-image linear-gradient($color-border, transparent) 30 30
  .showList-enter-active,
  .showList-leave-active
    transition all 0.3s
  .showList-enter,
  .showList-leave-to
    opacity 0
    transform translate3d(0, -100%, 0)
  .modal-enter-active,
  .modal-leave-active
    transition all 0.3s
  .modal-enter,
  .modal-leave-to
    opacity 0
  .modal
    position fixed
    width 100%
    height 100%
    background-color rgba(0, 0, 0, 0.3)
</style>
