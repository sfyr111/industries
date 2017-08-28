<template>
  <transition name="inUp">
    <div id="cover" v-show="showFlag">
      <div class="title">
        <p>欢迎使用</p>
        <p>北信源行业态势分析</p>
      </div>
      <div class="content">
          <i class="backdrop"></i>
      </div>
      <div class="explain">
        <p>我们会根据你设置的信息</p>
        <p>展示及时的消息并给予专业的分析</p> 
      </div>
      <div class="footer">
        <div class="btn" @click="showFlag=false">
          马上去设置
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'cover',
  data () {
    return {
      showFlag: true
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "~stylus-px2rem/index"
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  html-font-size = 75px;

  #cover
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    background-color #fff
    .title
      display flex
      height 250px
      flex-direction column
      justify-content center
      align-items center
      line-height 75px
      font-size 46px
      color #429AFF
    .content
      height 600px
      display flex
      justify-content center
      align-items center
      .backdrop
        height 570px
        width 550px
        bg-image('index-background')
        background-size 100% 100%
    .explain
      height 220px
      display flex
      flex-direction column
      justify-content center
      align-items center
      color $color-text-d
      font-size 28px
      line-height 40px
    >.footer 
      height 150px
      display flex
      justify-content center
      // align-items center
      >.btn 
        width 240px
        height 80px
        background #4799FE
        color #fff
        display flex
        justify-content center
        align-items center
        border-radius 20px
  .inUp-enter-active,
  .inUp-leave-active
    transition all .3s
  .inUp-enter,
  .inUp-leave-to
    transform translate3d(0, 100%, 0)
</style>
