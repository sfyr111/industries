<template>
  <div class="list-cell">
    <li @click="selectItem(item)">
      <section class="sectionContent">
        <h2 v-html="item.title" :class="isVisited(item.id) ? 'visited' : ''"></h2>
        <section>
          <span>{{item.webSite}}</span>
          <span>{{item.poTime}}</span>      
        </section>
      </section>
    </li>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'list-cell',
    props: {
      item: {
        type: Object,
        defalut: null
      }
    },
    computed: {
      ...mapGetters([
        'visitedList'
      ])
    },
    components: {
    },
    methods: {
      selectItem (item) {
        this.$emit('select', item)
      },
      isVisited (id) {
        return !!this.visitedList.find(item => {
          return item.id === id
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~stylus-px2rem/index"
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  html-font-size = 75px;
  
  .list-cell
    li
      padding 0 40px
      .sectionContent
        padding 18px 0
        border-bottom 1px solid $color-border-d
        border-image linear-gradient($color-border-d, transparent) 30 30
        h2.visited
          color $color-text-d
        h2
          font-size $font-size-medium-x * 2
          color $color-text
          line-height 2.4
          no-wrap()
        section
          display: flex
          justify-content: space-between
          font-size $font-size-small * 2
          color $color-text-d
          span
            no-wrap()
</style>
