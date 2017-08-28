<template>
  <div id="copyright">
    <v-header title="行业态势分析版权声明"></v-header>
    <div class="content">
      <P>北信源行业态势分析产品获取的互联网上发布的公开信息，信息的版权归原发布者声明的内容权属者所有。</P>
      <p>如果对北信源行业态势分析收录有异议，请发Email至<span>yuqing_service@vrvmail.com.cn</span>，公司将会根据发布者的要求进行适当处理。</p>
      <p>北信源公司不承担用户使用行业态势分析系统或行业态势分析系统中的信息或分析报告等相关事项所产生的任何法律责任或任何纠纷的连带责任 。</p>
    </div>
  </div>
</template>

<script>
import VHeader from 'components/v-header/v-header'
export default {
  name: 'copyright',
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
