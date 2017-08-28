<template>
  <div class="discovery-min-tab">
    <router-link class="discovery-min-tab-item" to="/discovery/industry">
      <section @click="selectTrend('industry')">
        <i class="discovery-min-tab-icon"></i>
      </section>
    </router-link>
    <router-link class="discovery-min-tab-item" to="/discovery/company">
      <section @click="selectTrend('company')">
        <i class="discovery-min-tab-icon"></i>
      </section>
    </router-link>
    <router-link class="discovery-min-tab-item" to="/discovery/product">
      <section @click="selectTrend('product')">
        <i class="discovery-min-tab-icon"></i>
      </section>
    </router-link>
    <router-link class="discovery-min-tab-item" to="/discovery/tender">
      <section @click="selectTrend('tender')">
        <i class="discovery-min-tab-icon"></i>
      </section>
    </router-link>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    name: 'discovery-min-tab',
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

  .discovery-min-tab
    position absolute
    top 0
    left 0
    right 0
    display flex
    justify-content space-around
    line-height ($font-size-small + 8px) * 2
    background-color $color-background
    .discovery-min-tab-item
      color $color-text
      font-size $font-size-small * 2
      flex-basis 25%
      justify-content center
      // padding 28px 0
      > section
        display flex
        flex-direction column
        text-align center
        .discovery-min-tab-icon
          display inline-block
          width 88px
          height 88px
          background-size cover
          margin 0 auto
      &:nth-of-type(1)
        .discovery-min-tab-icon
          bg-image('../discovery-tab/图标-行业动态')
      &:nth-of-type(2)
        .discovery-min-tab-icon
          bg-image('../discovery-tab/图标-企业动态')
      &:nth-of-type(3)
        .discovery-min-tab-icon
          bg-image('../discovery-tab/图标-产品动态')
      &:nth-of-type(4)
        .discovery-min-tab-icon
          bg-image('../discovery-tab/图标-招标动态')
</style>
