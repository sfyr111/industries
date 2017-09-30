const types = {
  SET_MODIFY_ITEM: 'SET_MODIFY_ITEM',
  CLEAR_MODIFY_ITEM: 'CLEAR_MODIFY_ITEM',
  SET_SELECTED_ITEM: 'SET_SELECTED_ITEM',
  CHANGE_DATE_SELECTED_ITEM: 'CHANGE_DATE_SELECTED_ITEM'
}

export default {
  namespaced: true,
  state: {
    modifyItem: {},
    selectedItem: {}
  },
  getters: {
    modifyItem (state) {
      return state.modifyItem
    },
    selectedItem (state) {
      return state.selectedItem
    }
  },
  mutations: {
    [types.SET_MODIFY_ITEM] (state, item) {
      state.modifyItem = item
    },
    [types.CLEAR_MODIFY_ITEM] (state) {
      state.modifyItem = {}
    },
    [types.SET_SELECTED_ITEM] (state, item) {
      state.selectedItem = item
    },
    [types.CHANGE_DATE_SELECTED_ITEM] (state, date) {
      state.selectedItem.endPoTime = date.dateEndTime + ' 23:59:59'
      state.selectedItem.startPoTime = date.dateStartTime + ' 00:00:00'
    }
  },
  actions: {}
}
