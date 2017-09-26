<template>
  <div class="test">
    <div class="test">
      <button @click="xhrtest">xhrtest</button>
      <button @click="_getUserSettings">getUserSettings</button>
      <button @click="_saveUserSettings">saveUserSettings</button>
      <button @click="_getIndustryList">getIndustryList</button>
      <button @click="_getHotNews">getHotNews</button>
      <button @click="_getCompanyList">getCompanyList</button>
      <button @click="_getCompanyClassifyAndList">getCompanyClassifyAndList</button>
      <button @click="_getProductsClassifyAndList">getProductsClassifyAndList</button>
      <button @click="_getTenderClassifyAndList">getTenderClassifyAndList</button>
      <button @click="_getCompanyRanking">getCompanyRanking</button>
      <button @click="_getProductsRanking">getProductsRanking</button>
      <button @click="_concurrent">concurrent</button>
      <button @click="_getDetail">getDetail</button>
      <button @click="_fetchDetail">fetchDetail</button>
      <button @click="_getIndustryTrend">getIndustryTrend</button>
      <button @click="_getCompanyTrend">getCompanyTrend</button>
      <button @click="_getProductTrend">getProductTrend</button>
      <button @click="_getTenderTrend">getTenderTrend</button>
      <button @click="_getIndustryClassify">getIndustryClassify</button>
      <button @click="_getCompanyClassify">getCompanyClassify</button>
      <button @click="_getProductClassify">getProductClassify</button>
      <button @click="ztg">ztg</button>
      <button @click="getAccountInfo">getAccountInfo</button>
    </div>
  </div>
</template>

<script>
  import {
          apiTest,
          getUserSettings,
          saveUserSettings,
          getIndustryList,
          getIndustryClassify,
          getHotNews,
          getCompanyList,
          getCompanyClassify,
          getCompanyClassifyAndList,
          getProductsClassifyAndList,
          getTenderClassifyAndList,
          getCompanyRanking,
          getProductsRanking,
          getDetail,
          getIndustryTrend,
          getCompanyTrend,
          getProductTrend,
          getTenderTrend,
          getProductClassify
        } from 'api'
  import { mapActions } from 'vuex'
  import { ERR_OK } from 'api/config'
  import axios from 'axios'
  import vrv from 'common/js/vrv-jssdk'

  export default {
    name: 'app',
    data () {
      return {}
    },
    methods: {
      getAccountInfo () {
        vrv.ready(() => {
          vrv.jssdk.getAccountInfo({
            success: function (data) {
              alert(data)
            }
          })
        })
      },
      ztg () {
        axios({
          url: 'http://localhost:9000/ztg',
          method: 'GET',
          withCredentials: true
        })
          .then(function (response) {
            console.log(response.data)
          })
          .catch(function (response) {
            console.log(response)
          })
      },
      xhrtest () {
        const params = {}
        apiTest(params).then(data => {
          if (data.code === ERR_OK) {
            console.log(data)
          }
          return data
        }).then(dd => {
          console.log(dd)
        }).catch(err => {
          alert(err)
        })
        Promise.all([apiTest(params), apiTest(params), apiTest(params)]).then(data => {
          console.log(data)
          const [{ list: a }, b, c] = data
          console.log(a)
          console.log(b)
          console.log(c)
        })
      },
      async _getUserSettings () {
        return await getUserSettings().then(data => {
          if (data.code === ERR_OK) {
            console.log(data)
            return data
          }
        })
      },
      async _saveUserSettings () {
        const params = {
          firstlogin: true
        }
        return await saveUserSettings(params).then(data => {
          if (data.code === ERR_OK) {
            console.log(data)
            return data
          }
        })
      },
      async _getIndustryList () {
        return await getIndustryList().then(data => {
          if (data.code === ERR_OK) {
            console.log(data)
            return data
          }
        })
      },
      async _getHotNews () {
        const params = {
          limit: 5
        }
        return await getHotNews(params).then(data => {
          if (data.code === ERR_OK) {
            console.log(data)
            return data
          }
        })
      },
      async _getCompanyList () {
        const params = {
          count: 5
        }
        return await getCompanyList(params).then(data => {
          if (data.code === ERR_OK) {
            console.log(data)
            return data
          }
        })
      },
      async _getCompanyClassifyAndList () {
        const params = {
          count: 4,
          limit: 5
        }
        return await getCompanyClassifyAndList(params).then(data => {
          if (data.code === ERR_OK) {
            console.log(data)
            return data
          }
        })
      },
      async _getProductsClassifyAndList () {
        const params = {
          count: 4,
          limit: 5
        }
        return await getProductsClassifyAndList(params).then(data => {
          if (data.code === ERR_OK) {
            console.log(data)
            return data
          }
        })
      },
      async _getTenderClassifyAndList () {
        const params = {
          count: 4,
          limit: 5
        }
        return await getTenderClassifyAndList(params).then(data => {
          if (data.code === ERR_OK) {
            console.log(data)
            return data
          }
        })
      },
      async _getCompanyRanking () {
        const params = {
          count: 5
        }
        return await getCompanyRanking(params).then(data => {
          if (data.code === ERR_OK) {
            console.log(data)
            return data
          }
        })
      },
      async _getProductsRanking () {
        const params = {
          count: 5
        }
        return await getProductsRanking(params).then(data => {
          if (data.code === ERR_OK) {
            console.log(data)
            return data
          }
        })
      },
      async _getDetail () {
        const params = {
          id: 'a78a3215cd0d5a5fc841ed0cad38d687'
        }
        return await getDetail(params).then(data => {
          if (data.code === ERR_OK) {
            console.log(data)
            return data
          }
        })
      },
      async _getIndustryTrend () {
        const params = {
          limit: 30,
          currentPage: 0
        }
        return await getIndustryTrend(params).then(data => {
          if (data.code === ERR_OK) {
            console.log(data)
            return data
          }
        })
      },
      async _getCompanyTrend () {
        const params = {
          limit: 30,
          currentPage: 0
        }
        return await getCompanyTrend(params).then(data => {
          if (data.code === ERR_OK) {
            console.log(data)
            return data
          }
        })
      },
      async _getProductTrend () {
        const params = {
          limit: 30,
          currentPage: 0
        }
        return await getProductTrend(params).then(data => {
          if (data.code === ERR_OK) {
            console.log(data)
            return data
          }
        })
      },
      async _getTenderTrend () {
        const params = {
          limit: 30,
          currentPage: 0
        }
        return await getTenderTrend(params).then(data => {
          if (data.code === ERR_OK) {
            console.log(data)
            return data
          }
        })
      },
      async _getIndustryClassify () {
        const params = {
          // count: 5
        }
        return await getIndustryClassify(params).then(data => {
          if (data.code === ERR_OK) {
            console.log(data)
            return data
          }
        })
      },
      async _getCompanyClassify () {
        const params = {
          // count: 5
        }
        return await getCompanyClassify(params).then(data => {
          if (data.code === ERR_OK) {
            console.log(data)
            return data
          }
        })
      },
      async _getProductClassify () {
        const params = {
          // count: 5
        }
        return await getProductClassify(params).then(data => {
          if (data.code === ERR_OK) {
            console.log(data)
            return data
          }
        })
      },
      async _concurrent () {
        const data = await Promise.all([this._getHotNews(), this._getCompanyClassifyAndList(), this._getProductsClassifyAndList(), this._getTenderClassifyAndList(), this._getCompanyRanking(), this._getProductsRanking()])
        console.log(...data)
        return data
      },
      async _fetchDetail () {
        const data = await this.fetchDetail('a78a3215cd0d5a5fc841ed0cad38d687')
        return data
      },
      ...mapActions([
        'fetchDetail'
      ])
    },
    created () {
    },
    components: {
    }
  }
</script>

<style scoped lang="stylus">
  @import "~stylus-px2rem/index"
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  html-font-size = 75px;

  .test
    display flex
    // flex-direction column
    flex-wrap wrap
    height 100vh
    overflow scroll
    button
      // width 100vw
      flex-basis 50%
      // height 80px
      border 1px solid
      background-color #ccc
      border-radius 5px
      no-wrap()
</style>
