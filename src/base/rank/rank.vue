<template>
  <div id="rank">
    <div class="title">
      <span class="title-left">
         {{title}}
      </span>
      <span class="title-right">
      </span>
    </div>
    <table class="tad">
        <thead>
            <tr class="theader">
                <th>排名</th>
                <th>名称</th>
                <th>数量</th>
            </tr>
        </thead>
        <tbody>
            <tr class="tadconent" v-for="(item, index) in ranking" :key="item.id">
                <td>
                    <b :class="[rankingclass[index]]"></b>
                </td>
                <td>{{item.key}}</td>
                <td>{{item.count}}</td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'rank',
  props: {
    title: {
      type: String,
      default: '排行'
    },
    ranking: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      // title: '企业竞争力排行',
      // ranking: [
      //   {ranking: 1, company: '阿里巴巴', quantity: 21349},
      //   {ranking: 2, company: '百度', quantity: 20411},
      //   {ranking: 3, company: '腾讯', quantity: 20411},
      //   {ranking: 4, company: '华为', quantity: 20411},
      //   {ranking: 5, company: '小米', quantity: 20411}
      // ],
      rankingclass: ['one', 'two', 'three', 'four', 'five']
    }
  },
  computed: {},
  components: {
  },
  watch: {},
  methods: {
  },
  created () {},
  mounted () {}
}
</script>

<style scoped lang="stylus">
@import "~stylus-px2rem/index"
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
html-font-size = 75px;

#rank
  background $color-background
  margin-top 20px
.title
  height 100px
  display flex
  justify-content space-between
  align-items center
  padding 0px 25px
  .title-right
    display block
    width 90px
    height 90px
    bg-image('report') 
    background-size 100% 100%
    extend-click()
.tad
  width 750px
  .theader
    font-size 28px
    border-top 0.026667rem solid #D9D9D9
    box-shadow 0.5px 0.5px 0.5px 0.5px #fafafa
    th
      height 58px
      vertical-align middle
      color #c3c3c3
      text-align center
  .tadconent
    td
      border-top 0.026667rem solid #D9D9D9
      height 100px
      vertical-align middle
      text-align center
      font-size 28px
      &:nth-child(1)
        display flex
        justify-content center
        align-items center
    b
      width 70px
      height 70px
      display block
      background-size 100% 100%
    .one
      bg-image('one')
    .two
      bg-image('two')
    .three
      bg-image('three')
    .four
      bg-image('four')
    .five
      bg-image('five')
      
</style>
