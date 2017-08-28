import { throttle } from 'common/js/util'

const hold = 4000

export const listLoadMixin = {
  methods: {
    _refresh: throttle(function () {
      this.refresh()
    }, hold),
    _loadMore: throttle(function () {
      this.loadMore()
    }, hold)
  }
}
