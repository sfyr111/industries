<template>
  <transition name="slide">
    <div class="personal">
      <v-header title="个人信息">
        <div @click="_showSettings" slot="right">修改</div>
      </v-header>
      <div class="personal-center">
        <div class="personal-top">
          <group>
            <cell title="性别" :value="sexOption"></cell>
            <cell title="年龄段" :value="ageOption"></cell>
          </group>
        </div>
        <div class="personal-bottom">
          <group>
            <cell title="我所在的行业" :value="industryOption"></cell>
            <cell title="我的公司" :value="companyOption"></cell>
            <cell title="我的职务" :value="jobOption"></cell>
          </group>
        </div>
      </div>
      <personal-settings v-if="showSettings" @hideSettings="_hideSettings"></personal-settings>
    </div>
  </transition>
</template>

<script>
  import VHeader from 'components/v-header/v-header'
  import { Group, Cell } from 'vux'
  import { ERR_OK } from 'api/config'
  import { getIndustryList, getUserSettings } from 'api'

  export default {
    name: 'personal',
    props: {},
    data () {
      return {
        sexOption: '',
        ageOption: '',
        industryOption: '',
        companyOption: '',
        jobOption: '',
        showSettings: false
      }
    },
    computed: {
    },
    components: {
      VHeader,
      Group,
      Cell,
      PersonalSettings: () => import('components/personal-settings/personal-settings')
    },
    watch: {
    },
    methods: {
      _showSettings () {
        this.showSettings = true
      },
      _hideSettings () {
        this.showSettings = false
      },
      _getIndustryList () {
        getIndustryList().then(data => {
          if (data.code === ERR_OK) {
            console.log(data)
          }
        })
      },
      async _getUserSettings () {
        const data = await getUserSettings().then(data => {
          if (data.code === ERR_OK) {
            this.ageOption = data.obj.age
            this.sexOption = data.obj.sex
            this.jobOption = data.obj.job
            this.companyOption = data.obj.companyName
            this.industryOption = data.obj.industryName
          }
          return data.obj
        })
        return data
      }
    },
    created () {
      this._getIndustryList()
      this._getUserSettings()
    },
    mounted () {
    }
  }
</script>

<style lang="stylus">
  @import "~stylus-px2rem/index"
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  html-font-size = 75px;

  .personal
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    z-index 50
    background $color-highlight-background
    .personal-center
      background $color-background
      margin-top 20px
      height 1332px
    .personal-bottom
      margin-top 40px
    .weui-cells
      margin-top 0
    .weui-cell
      &:before
        left 0

  .slide-enter-active,
  .slide-leave-active
    transition all 0.3s
  .slide-enter,
  .slide-leave-to
    transform translate3d(100%, 0, 0)
</style>

