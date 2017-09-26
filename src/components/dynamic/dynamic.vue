<template>
  <transition name="slide">
    <div class="dynamic">
      <v-header :title="getTitle($route.params.item)"></v-header>
      <section class="dynamic-label" v-show="tabs.length">
        <swiper :options="swiperOption">
          <swiper-slide @click.native="getDetail(item)" v-for="(item, index) in tabs" :key="item.id">{{item.name}}</swiper-slide>
        </swiper>
      </section>
      <div class="list-wrapper">
        <list :list="list"
              :pullup="pullup"
              :pulldown="pulldown"
              :hasMore="hasMore"
              :hasRefresh="hasRefresh"
              :reveal="reveal"
              @scroll=""
              @refresh="_refresh"
              @loadMore="_loadMore"
              @selectItem="selectItem">
        </list>
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
  import List from 'base/list/list'
  import { ERR_OK } from 'api/config'
  import { listLoadMixin } from 'common/js/mixin'
  import VHeader from 'components/v-header/v-header'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import { getIndustryTrend, getCompanyTrend, getProductTrend, getTenderTrend, getIndustryClassify, getCompanyClassify, getProductClassify, getTenderProductsClassify } from 'api'

  export default {
    name: 'dynamic',
    mixins: [listLoadMixin],
    data () {
      return {
        swiperOption: {
          slidesPerView: 3,
          paginationClickable: true,
          spaceBetween: 20,
          freeMode: true
        },
        list: [],
        tabs: [],
        page: 1,
        hasMore: true,
        hasRefresh: true,
        pullup: true,
        pulldown: true,
        reveal: false
      }
    },
    computed: {
      ...mapGetters([
        'discoveryItem'
      ])
    },
    components: {
      List,
      swiper,
      VHeader,
      swiperSlide
    },
    watch: {},
    methods: {
      getDetail (item) {
        this.setDynamicItem({ tag: item.tag.toString(), title: item.name })
        this.$router.push({
          path: `/discovery/${this.$route.params.item}/${item.id}`
        })
      },
      async _getIndustryClassify () {
        const params = {
        }
        return await getIndustryClassify(params).then(data => {
          if (data.code === ERR_OK) {
            return data
          }
        })
      },
      async _getCompanyClassify () {
        const params = {
        }
        return await getCompanyClassify(params).then(data => {
          if (data.code === ERR_OK) {
            return data
          }
        })
      },
      async _getProductClassify () {
        const params = {
        }
        return await getProductClassify(params).then(data => {
          if (data.code === ERR_OK) {
            return data
          }
        })
      },
      async _getTenderProductsClassify () {
        const params = {
        }
        return await getTenderProductsClassify(params).then(data => {
          if (data.code === ERR_OK) {
            return data
          }
        })
      },
      async _getIndustryTrend (params) {
        return await getIndustryTrend(params).then(data => {
          if (data.code === ERR_OK) {
            return data
          }
        })
      },
      async _getCompanyTrend (params) {
        return await getCompanyTrend(params).then(data => {
          if (data.code === ERR_OK) {
            return data
          }
        })
      },
      async _getProductTrend (params) {
        return await getProductTrend(params).then(data => {
          if (data.code === ERR_OK) {
            return data
          }
        })
      },
      async _getTenderTrend (params) {
        return await getTenderTrend(params).then(data => {
          if (data.code === ERR_OK) {
            return data
          }
        })
      },
      async _getClassify (item) {
        switch (item) {
          case 'industry': {
            return await this._getIndustryClassify()
          }
          case 'company': {
            return await this._getCompanyClassify()
          }
          case 'product': {
            return await this._getProductClassify()
          }
          case 'tender': {
            return await this._getTenderProductsClassify()
          }
          default: {
            return await ''
          }
        }
      },
      async _getTrend (item) {
        const params = {
          limit: 20,
          currentPage: this.page
        }
        switch (item) {
          case 'industry': {
            return await this._getIndustryTrend(params)
          }
          case 'company': {
            return await this._getCompanyTrend(params)
          }
          case 'product': {
            return await this._getProductTrend(params)
          }
          case 'tender': {
            return await this._getTenderTrend(params)
          }
          default: {
            return await ''
          }
        }
      },
      loadMore () {
        this.page += 1
        this.hasMore = true
        this._getTrend(this.discoveryItem).then(data => {
          if (data.code === ERR_OK) {
            this.list = this.list.concat(data.list)
          }
        })
      },
      refresh () {
        this.page = 1
        this.reveal = true
        this._getTrend(this.discoveryItem).then(data => {
          if (data.code === ERR_OK) {
            this.reveal = false
            this.list = data.list
          }
        })
      },
      async _concurrent () {
        if (!this.discoveryItem) this.$router.push('/discovery')
        const data = await Promise.all([this._getClassify(this.discoveryItem), this._getTrend(this.discoveryItem)])

        const [{ list: tabs }, { list }] = data

        this.tabs = tabs
        this.list = list

        return data
      },
      getTitle (label) {
        switch (label) {
          case 'industry': {
            return '行业动态'
          }
          case 'company': {
            return '企业动态'
          }
          case 'product': {
            return '产品动态'
          }
          case 'tender': {
            return '招标动态'
          }
          default: {
            return ''
          }
        }
      },
      selectItem (item) {
        this.fetchDetail(item)
      },
      ...mapActions([
        'fetchDetail'
      ]),
      ...mapMutations({
        'setDynamicItem': 'SET_DYNAMIC_ITEM'
      })
    },
    activated () {
    },
    created () {
      this._concurrent()
    },
    mounted () {}
  }
</script>

<style lang="stylus" scoped>
  @import "~stylus-px2rem/index"
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  @import '~swiper/dist/css/swiper.css'
  html-font-size = 75px;

  .dynamic
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    z-index 50
    background $color-background
    .dynamic-label
      padding 15px 0
      font-size $font-size-small * 2
      border-bottom 1px solid $color-border
      border-image: linear-gradient($color-border, transparent) 30 30
      .swiper-container
        .swiper-wrapper
          .swiper-slide
            text-align center
            padding 10px 0
            background-color $color-highlight-background
            no-wrap()
    .list-wrapper
      height calc(100% - 2.51rem)
  .slide-enter-active,
  .slide-leave-active
    transition all 0.3s
  .slide-enter,
  .slide-leave-to
    transform translate3d(100%, 0, 0)
</style>
