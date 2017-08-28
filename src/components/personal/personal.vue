<template>
  <transition name="inUp">
    <div class="person-sertting">
      <div class="title">
          <span>设置你的信息</span>
      </div>
      <div class="center">
        <div class="top">
          <group>
            <popup-picker title="性别"  placeholder="请修改" :data="sexOption"  v-model="sex" ></popup-picker>
            <popup-picker title="年龄段" :data="ageOption" placeholder="请修改" v-model="age" ></popup-picker>
          </group>
        </div>
        <div class="bottom">
          <group class="bottom-group">
            <popup-picker title="我所在的行业" 
            :data="industryOption" 
            :columns="1" 
            placeholder="请修改" 
            v-model="industry"  
            @on-hide="shadeHide" 
            show-name
            ref="industryPicker"></popup-picker>
            <div class="company-box"> 
              <popup-picker title="我的公司" 
              :data="companyOption" 
              :columns="1"
              placeholder="请修改" 
              v-model="company"
              show-name
              ref="companyPicker"></popup-picker>
              <div class="company-shade" v-show="shade" @click="verify"></div>
            </div>
            <popup-picker title="我的职务" :data="jobOption" placeholder="请修改" v-model="job" ></popup-picker>
          </group>
            <!--<x-input :max="6" :min="6"  on-change="change" placeholder="" title="请输入6位数字" type="text"></x-input>-->
        </div>
      </div>
      <div class="footer">
        <div class="btn" @click="back">
            取消
        </div>
        <div class="btn" @click="isShowConfirm=true">
            保存
        </div>
      </div>
      <div>
        <alert v-model="show" :title="''"  @on-hide="onHide">请先选择行业</alert>
        <confirm v-model="isShowConfirm"
          :title="'是否修改设置并重新进入'"
          @on-cancel="isShowConfirm=false"
          @on-confirm="saveAndEsc">
        </confirm>
      </div>
    </div>
  </transition>
</template>

<script>
  import vrv from 'common/js/vrv-jssdk'
  import { ERR_OK } from 'api/config'
  import { mapMutations, mapGetters } from 'vuex'
  import { Alert, Group, XInput, PopupPicker, Confirm } from 'vux'
  import { getIndustryList, getCompanyList, saveUserSettings, getUserSettings } from 'api'

  export default {
    name: 'personal',
    props: {},
    data () {
      return {
        show: false,
        shade: true,
        sex: [],
        sexOption: [[ '男', '女' ]],
        ageOption: [['20岁以下', '20-30', '30-40', '40-50', '50-60', '60-70', '70岁以上']],
        age: [],
        industryOption: [],
        industry: [],
        industryId: 1,
        companyOption: [],
        company: [],
        companyId: 1,
        jobOption: [['基层', '中层', '高层']],
        job: [],
        isShowConfirm: false
      }
    },
    computed: {
      ...mapGetters([
        'userToken'
      ])
    },
    components: {
      Alert,
      Group,
      XInput,
      Confirm,
      PopupPicker
    },
    watch: {
      industry (newValue) {
        newValue = newValue.toString()
        const id = this.getId(this.industryOption, newValue, (item) => item.value === newValue)
        this.industryId = id
        this.$nextTick(() => {
          this._getCompanyList(id)
        })
      },
      company (newValue) {
        newValue = newValue.toString()
        const id = this.getId(this.companyOption, newValue, (item) => item.value === newValue)
        this.companyId = id
      }
    },
    methods: {
      verify () {
        if (this.industry.length === 0) {
          this.show = true
        }
      },
      back () {
        window.history.back()
      },
      onHide () {
      },
      shadeHide (type) {
        if (type) {
          this.shade = false
        }
      },
      getId (arr, val, compare) {
        const id = arr.find(compare).id
        return id
      },
      _getCompanyList (targetId) {
        this.companyOption = []
        const params = {
          targetId
        }
        getCompanyList(params).then(data => {
          if (data.code === ERR_OK) {
            data.list.forEach(item => {
              item.parent = 0
              item.value = item.name
              this.companyOption.push(item)
            })
          }
        })
      },
      _getIndustryList () {
        getIndustryList().then(data => {
          if (data.code === ERR_OK) {
            data.list.forEach(item => {
              item.parent = 0
              item.value = item.name
              this.industryOption.push(item)
            })
          }
        })
      },
      entry () {
        this._saveUserSettings()
      },
      saveAndEsc () {
        this._saveUserSettings().then(() => {
          try {
            // 关闭
            vrv.jssdk.closeView({})
          } catch (e) {
            console.error(e)
            window.location.href = 'http://localhost:7000'
          }
        })
      },
      async _saveUserSettings () {
        const params = {
          sex: this.sex[0],
          companyid: this.companyId,
          age: this.age[0],
          industryid: this.industryId,
          job: this.job[0],
          firstlogin: this.userToken === '1235' || false
        }
        const data = await saveUserSettings(params).then(data => {
          if (data.code === ERR_OK) {
            console.info('设置成功')
          }
        })
        return data
      },
      async _getUserSettings () {
        const data = await getUserSettings().then(data => {
          if (data.code === ERR_OK) {
            console.log(data.obj)
            if (data.obj.age === '未设置') return
            else this.age = [data.obj.age]
            if (data.obj.sex === '未设置') return
            else this.sex = [data.obj.sex]
            // this.job = [data.obj.job]
            // this.company = [data.obj.companyName]
            // this.companyId = Number(data.obj.companyid)
            // this.industry = [data.obj.industryName]
            // this.industryId = Number(data.obj.id)
          }
          return data.obj
        })
        return data
      },
      ...mapMutations({
        'setFirstLogin': 'SET_FIRST_LOGIN'
      })
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

  .person-sertting
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    z-index 50
    background $color-background
    >.title
      width 750px
      height 130px
      color #429AFF
      display flex
      justify-content center
      align-items center
      font-size 46px
      // margin-bottom 90px
    >.center
      font-size 30px
      .top
        margin-bottom 26px
      .company-box
        position relative
        .company-shade
          position absolute
          z-index 50
          top 0px
          left 0px
          right 0px
          bottom 0px
      .bottom
        .bottom-group
          .weui-label
            width 3rem
    >.footer 
      height 433px
      display flex
      justify-content space-around
      align-items center
      >.btn 
        width 240px
        height 80px
        background #4799FE
        color #fff
        display flex
        justify-content center
        align-items center
        border-radius 20px
    .vux-cell-box
      padding 0.2rem 0
      border-bottom 0.026667rem solid #D9D9D9
      &:before
        border none
      &:nth-child(2)
        border-top none
      &:nth-child(3)
        border-top none

  .inUp-enter-active,
  .inUp-leave-active
    transition all .3s
  .inUp-enter,
  .inUp-leave-to
    transform translate3d(0, 100%, 0)
</style>

