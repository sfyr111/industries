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

export const chartDataMixin = {
  methods: {
    normalizLineData (dataObj) {
      let obj = {
        columns: ['日期'],
        rows: []
      }
      dataObj.bars.forEach(item => {
        obj.columns.push(item.name)
      })
      for (let i = 0; i < dataObj.times.length; i++) {
        let o = {}
        o['日期'] = dataObj.times[i]
        for (let j = 0; j < dataObj.bars.length; j++) {
          o[dataObj.bars[j].name] = dataObj.bars[j].data[i]
        }
        obj.rows.push(o)
      }
      return obj
    }
  }
}
