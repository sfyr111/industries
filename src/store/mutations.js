import * as types from './mutations-types'

const mutations = {
  [types.SET_USER_TOKEN] (state, token) {
    state.userToken = token
  },
  [types.SET_FIRST_LOGIN] (state, first) {
    state.firstLogin = first
  },
  [types.SET_USER_ID] (state, id) {
    state.userId = id
  },
  [types.SET_DETAIL] (state, { obj: detail }) {
    state.detail = detail
  },
  [types.TOGGLE_DETAIL_PAGE] (state, showFlag) {
    state.detailShowFlag = showFlag
  },
  [types.SET_DISCOVERY_ITEM] (state, item) {
    state.discoveryItem = item
  },
  [types.SET_DYNAMIC_ITEM] (state, item) {
    state.dynamicItem = item
  },
  [types.SET_VISITED_LIST] (state, list) {
    state.visitedList = list
  },
  [types.SET_SEARCH_HISTORY] (state, history) {
    state.searchHistory = history
  },
  [types.SET_ANALYSIS_ITEM] (state, item) {
    state.analysisItem = item
  }
}

export default mutations
