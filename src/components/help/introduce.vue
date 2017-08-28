<template>
  <div id="introduce">
    <v-header title="行业态势分析简介"></v-header>
    <div class="content">
      <p>行业态势分析是基于北信源大数据监测体系互联网信息监测工具</p>
      <p>政府部门人员可以利用行业态势分析实现对行业舆情的监测，在第一时间发现舆情源头，查看舆情的倾向和走势，为下一步的行政决策提供参考</p>
      <p>对于企业用户来说，您可以通过行业态势分析企业自身及行业的信息。</p>
    </div>
  </div>
</template>

<script>
import VHeader from 'components/v-header/v-header'
export default {
  name: 'introduce',
  mixins: [],
  data () {
    return {}
  },
  computed: {},
  components: {
    VHeader
  },
  watch: {},
  methods: {
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

.content
  padding 50px 30px
  & p
    color $color-text
    line-height 50px
    font-size 28px
    text-indent 2em
</style>
