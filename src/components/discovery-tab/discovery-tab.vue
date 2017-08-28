<template>
  <div class="discovery-tab">
    <router-link class="discovery-tab-item" to="/discovery/industry">
      <section @click="selectTrend('industry')">
        <i class="discovery-tab-icon"></i>
        <span class="discovery-tab-link">行业动态</span>
      </section>
    </router-link>
    <router-link class="discovery-tab-item" to="/discovery/company">
      <section @click="selectTrend('company')">
        <i class="discovery-tab-icon"></i>
        <span class="discovery-tab-link">企业动态</span>
      </section>
    </router-link>
    <router-link class="discovery-tab-item" to="/discovery/product">
      <section @click="selectTrend('product')">
        <i class="discovery-tab-icon"></i>
        <span class="discovery-tab-link">产品动态</span>
      </section>
    </router-link>
    <router-link class="discovery-tab-item" to="/discovery/tender">
      <section @click="selectTrend('tender')">
        <i class="discovery-tab-icon"></i>
        <span class="discovery-tab-link">招标动态</span>
      </section>
    </router-link>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    name: 'discovery-tab',
    mixins: [],
    data () {
      return {}
    },
    computed: {},
    components: {
    },
    watch: {},
    methods: {
      selectTrend (item) {
        this.setDiscoveryItem(item)
      },
      ...mapMutations({
        'setDiscoveryItem': 'SET_DISCOVERY_ITEM'
      })
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

  .discovery-tab
    display flex
    justify-content space-around
    line-height ($font-size-small + 8px) * 2
    background-color $color-background
    .discovery-tab-item
      color $color-text
      font-size $font-size-small * 2
      flex-basis 25%
      justify-content center
      padding 28px 0
      > section
        display flex
        flex-direction column
        text-align center
        .discovery-tab-icon
          display inline-block
          width 88px
          height 88px
          background-size cover
          margin 0 auto
        .discovery-tab-link
          font-weight 600
      &:nth-of-type(1)
        .discovery-tab-icon
          bg-image('图标-行业动态')
      &:nth-of-type(2)
        .discovery-tab-icon
          bg-image('图标-企业动态')
      &:nth-of-type(3)
        .discovery-tab-icon
          bg-image('图标-产品动态')
      &:nth-of-type(4)
        .discovery-tab-icon
          bg-image('图标-招标动态')
</style>
