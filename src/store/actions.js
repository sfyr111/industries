import * as types from './mutations-types'
import { getDetail } from 'api'

import { saveUserToken, saveUserId, saveVisited, saveSearch, deleteSearch, clearSearch } from 'common/js/cache'

const ERR_OK = '000000'

const _getDetail = async function (id) {
  const params = {
    id
  }
  return await getDetail(params).then(data => {
    if (data.code === ERR_OK) {
      return data
    }
  })
}

export const saveUser = function ({ commit }, userToken) {
  commit(types.SET_USER_TOKEN, saveUserToken(userToken))
}

export const saveId = function ({ commit }, userToken) {
  commit(types.SET_USER_ID, saveUserId(userToken))
}

export const fetchDetail = async function ({ dispatch, commit, state }, item) {
  if (item.articleId) commit(types.SET_DETAIL, await _getDetail(item.articleId))
  else commit(types.SET_DETAIL, await _getDetail(item.id))
  commit(types.TOGGLE_DETAIL_PAGE, true)
  dispatch('saveVisitedList', item)
}

export const closeDetail = function ({ commit }) {
  commit(types.TOGGLE_DETAIL_PAGE, false)
  commit(types.SET_DETAIL, {})
}

export const saveVisitedList = function ({ dispatch, commit }, visited) {
  setTimeout(commit, 500, types.SET_VISITED_LIST, saveVisited(visited))
}

export const saveSearchHistory = function ({ commit }, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistory = function ({ commit }, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = function ({ commit }) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}
