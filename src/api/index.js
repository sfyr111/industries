import store from '@/store'

/**
 * API
 */

import api from './service'

export const apiTest = async function (data = {}) {
  const url = '/industry/sentiment/keyword/allkws.do'
  const params = { userToken: store.getters.userToken, ...data }

  return await api.post(url, params)
}

export const getUserSettings = async function (data = {}) {
  const url = '/industry/usersettings/get.do'
  const params = { userToken: store.getters.userToken, ...data }

  return await api.post(url, params)
}

export const saveUserSettings = async function (data = {}) {
  const url = '/industry/usersettings/save.do'
  const params = { userToken: store.getters.userToken, id: store.getters.userId, ...data }

  return await api.post(url, params)
}

export const getIndustryList = async function (data = {}) {
  const url = '/industry/industrys.do'
  const params = { userToken: store.getters.userToken, ...data }

  return await api.post(url, params)
}

export const getIndustryClassify = async function (data = {}) {
  const url = '/industry/industrystag.do'
  const params = { userToken: store.getters.userToken, ...data }

  return await api.post(url, params)
}

export const getHotNews = async function (data = {}) {
  const url = '/industry/hotnews.do'
  const params = { userToken: store.getters.userToken, ...data }

  return await api.post(url, params)
}

export const getCompanyList = async function (data = {}) {
  const url = '/industry/companys/get.do'
  const params = { userToken: store.getters.userToken, ...data }

  return await api.post(url, params)
}

export const getCompanyClassify = async function (data = {}) {
  const url = '/industry/companys/gettag.do'
  const params = { userToken: store.getters.userToken, ...data }

  return await api.post(url, params)
}

export const getCompanyClassifyAndList = async function (data = {}) {
  const url = '/industry/companys/gettagANDlist1.do'
  const params = { userToken: store.getters.userToken, ...data }

  return await api.post(url, params)
}

export const getProductsClassifyAndList = async function (data = {}) {
  const url = '/industry/products/getANDlist1.do'
  const params = { userToken: store.getters.userToken, ...data }

  return await api.post(url, params)
}

export const getTenderClassifyAndList = async function (data = {}) {
  const url = '/industry/zhaobiao/getANDlist1.do'
  const params = { userToken: store.getters.userToken, ...data }

  return await api.post(url, params)
}

export const getCompanyRanking = async function (data = {}) {
  const url = '/industry/companys/chart1.do'
  const params = { userToken: store.getters.userToken, ...data }

  return await api.post(url, params)
}

export const getProductsRanking = async function (data = {}) {
  const url = '/industry/products/chart1.do'
  const params = { userToken: store.getters.userToken, ...data }

  return await api.post(url, params)
}

export const getDetail = async function (data = {}) {
  const url = '/comb/detail.do'
  const params = { userToken: store.getters.userToken, ...data }

  return await api.post(url, params)
}

export const getIndustryTrend = async function (data = {}) {
  const url = '/industry/industrynews.do'
  const params = { userToken: store.getters.userToken, ...data }

  return await api.post(url, params)
}

export const getCompanyTrend = async function (data = {}) {
  const url = '/industry/companys/list2.do'
  const params = { userToken: store.getters.userToken, ...data }

  return await api.post(url, params)
}

export const getProductTrend = async function (data = {}) {
  const url = '/industry/products/list2.do'
  const params = { userToken: store.getters.userToken, ...data }

  return await api.post(url, params)
}

export const getTenderTrend = async function (data = {}) {
  const url = '/industry/zhaobiao/list2.do'
  const params = { userToken: store.getters.userToken, ...data }

  return await api.post(url, params)
}

export const getProductClassify = async function (data = {}) {
  const url = '/industry/products/get.do'
  const params = { userToken: store.getters.userToken, ...data }

  return await api.post(url, params)
}

export const getTenderClassify = async function (data = {}) {
  const url = '/industry/zhaobiao/get.do'
  const params = { userToken: store.getters.userToken, ...data }

  return await api.post(url, params)
}

export const getSearch = async function (data = {}) {
  const url = '/comb/search.do'
  const params = { userToken: store.getters.userToken, ...data }

  return await api.post(url, params)
}

export const saveCollectArticles = async function (data = {}) {
  const url = '/comb/bookmark/save.do'
  const params = { userToken: store.getters.userToken, Classfi: 1, ...data }

  return await api.post(url, params)
}

export const deleteCollectArticles = async function (data = {}) {
  const url = '/comb/bookmark/del.do'
  const params = { userToken: store.getters.userToken, ...data }

  return await api.post(url, params)
}

export const getCollectArticles = async function (data = {}) {
  const url = '/comb/bookmark/get.do'
  const params = { userToken: store.getters.userToken, classfi: 1, ...data }

  return await api.post(url, params)
}

export const judgeCollectArticles = async function (data = {}) {
  const url = '/comb/bookmark/marked.do'
  const params = { userToken: store.getters.userToken, classfi: 1, ...data }

  return await api.post(url, params)
}
