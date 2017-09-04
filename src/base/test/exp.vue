<template>
  <div id="exp">
    <div class="exp">
      <button @click="users">/users</button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: '',
    mixins: [],
    props: {
    },
    data () {
      return {}
    },
    computed: {},
    components: {},
    methods: {
      users () {
        axios.get('http://localhost:3002/industry', {
          params: {
            userToken: 1235
          }
        }).then(data => {
          console.log(data)
        })
      }
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

  .exp
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
