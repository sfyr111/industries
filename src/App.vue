<template>
  <div id="#app" class="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <tab></tab>
    <div class="guidance-warpper" v-show="$route.path !== '/test'">
      <guidance ref="guidance" @entry="entry" :showFlag="firstLogin"></guidance>
    </div>
    <detail :detail="detail"></detail>
  </div>
</template>

<script>
  import vrv from 'common/js/vrv-jssdk'
  import Tab from 'components/tab/tab'
  import Detail from 'base/detail/detail'
  import Guidance from 'base/guidance/guidance'
  import { ERR_OK } from 'api/config'
  import { getUserSettings } from 'api'
  import { mapActions, mapMutations, mapGetters } from 'vuex'

  export default {
    name: 'app',
    mixins: [],
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters([
        'firstLogin',
        'detail'
      ])
    },
    components: {
      Tab,
      Detail,
      Guidance
    },
    watch: {},
    methods: {
      entry () {
        // 引导进入主页
        setTimeout(this.$refs.guidance.hide, 1500)
      },
      _getUserSettings () {
        getUserSettings().then(data => {
          if (data.code === ERR_OK) {
            this._saveUserInfo(data.obj)
          }
        })
      },
      _saveUserInfo ({ id, firstlogin }) {
        this.saveId(id)
        this.setFirstLogin(firstlogin)
      },
      vrvReady () {
        vrv.ready(() => {
          try {
            vrv.jssdk.showNavigationBar({ show: false })
          } catch (err) {
            alert(err.message)
          }
        })
      },
      ...mapActions([
        'saveId',
        'saveUser'
      ]),
      ...mapMutations({
        'setFirstLogin': 'SET_FIRST_LOGIN'
      })
    },
    created () {
      this.vrvReady()
      this._getUserSettings()
    },
    mounted () {
    }
  }
</script>

<style scoped lang="stylus">
  @import "~stylus-px2rem/index"
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  html-font-size = 75px;

  .app
    display: flex
    flex-direction: column
    justify-content: flex-end
    height: 100vh
</style>
