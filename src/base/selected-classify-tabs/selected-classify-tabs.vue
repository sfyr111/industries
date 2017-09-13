<template>
  <div class="selected-classify-tabs">
    <div class="title">
      <span class="title-font">当前选中的有:</span>
    </div>
    <div class="selected--label" >
      <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in selectedItem" :key="item.id">{{item.name}}</swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
    name: 'selected-classify-tabs',
    props: {
      selectedItem: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        swiperOption: {
          slidesPerView: 3.6,
          paginationClickable: true,
          spaceBetween: 20,
          freeMode: true
        }
      }
    },
    computed: {},
    components: {
      swiper,
      swiperSlide
    },
    watch: {},
    methods: {},
    created () {},
    mounted () {}
  }
</script>

<style lang="stylus" scoped>
  @import "~stylus-px2rem/index"
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  @import '~swiper/dist/css/swiper.css'
  html-font-size = 75px;

  .selected-classify-tabs
    .title
      margin-top 24px
      margin-left 30px
      margin-bottom 24px
      color #7b7b7b
      font-size 30px
    .selected--label
      padding 24px 5px
      .swiper-container
        .swiper-wrapper
          .swiper-slide
            width 160px
            border 2px solid #4799FE
            color #4799FE
            height 60px
            background #ffffff
            font-size 30px
            display inline-flex
            justify-content center
            align-items center
            border-radius 7px
            box-sizing border-box
</style>
