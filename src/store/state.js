import { loadUserToken, loadVisited, loadSearch } from 'common/js/cache'

const state = {
  userToken: loadUserToken(),
  userId: -1,
  firstLogin: true,
  detail: {},
  detailShowFlag: false,
  discoveryItem: '',
  analysisItem: '',
  dynamicItem: {tag: '', title: ''},
  visitedList: loadVisited(),
  searchHistory: loadSearch()
}

export default state
