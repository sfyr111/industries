import store from '@/store'

/**
 * API
 */

import api from './service'

export const apiTest = async function (data = {}) {
  const url = '/industry/sentiment/keyword/allkws.do'
  const params = { userToken: store.getters.userToken, ...data }

  const response = await api.post(url, params)
  return response
}

export const getUserSettings = async function (data = {}) {
  const url = '/industry/usersettings/get.do'
  const params = { userToken: store.getters.userToken, ...data }

  const response = await api.post(url, params)
  return response
}

export const saveUserSettings = async function (data = {}) {
  const url = '/industry/usersettings/save.do'
  const params = { userToken: store.getters.userToken, id: store.getters.userId, ...data }

  const response = await api.post(url, params)
  return response
}

export const getIndustryList = async function (data = {}) {
  const url = '/industry/industrys.do'
  const params = { userToken: store.getters.userToken, ...data }

  const response = await api.post(url, params)
  return response
}

export const getIndustryClassify = async function (data = {}) {
  const url = '/industry/industrystag.do'
  const params = { userToken: store.getters.userToken, ...data }

  const response = await api.post(url, params)
  return response
}

export const getHotNews = async function (data = {}) {
  const url = '/industry/hotnews.do'
  const params = { userToken: store.getters.userToken, ...data }

  const response = await api.post(url, params)
  return response
}

export const getCompanyList = async function (data = {}) {
  const url = '/industry/companys/get.do'
  const params = { userToken: store.getters.userToken, ...data }

  const response = await api.post(url, params)
  return response
}

export const getCompanyClassify = async function (data = {}) {
  const url = '/industry/companys/gettag.do'
  const params = { userToken: store.getters.userToken, ...data }

  const response = await api.post(url, params)
  return response
}

export const getCompanyClassifyAndList = async function (data = {}) {
  const url = '/industry/companys/gettagANDlist1.do'
  const params = { userToken: store.getters.userToken, ...data }

  const response = await api.post(url, params)
  return response
}

export const getProductsClassifyAndList = async function (data = {}) {
  const url = '/industry/products/getANDlist1.do'
  const params = { userToken: store.getters.userToken, ...data }

  const response = await api.post(url, params)
  return response
}

export const getTenderClassifyAndList = async function (data = {}) {
  const url = '/industry/zhaobiao/getANDlist1.do'
  const params = { userToken: store.getters.userToken, ...data }

  const response = await api.post(url, params)
  return response
}

export const getCompanyRanking = async function (data = {}) {
  const url = '/industry/companys/chart1.do'
  const params = { userToken: store.getters.userToken, ...data }

  const response = await api.post(url, params)
  return response
}

export const getProductsRanking = async function (data = {}) {
  const url = '/industry/products/chart1.do'
  const params = { userToken: store.getters.userToken, ...data }

  const response = await api.post(url, params)
  return response
}

export const getDetail = async function (data = {}) {
  const url = '/comb/detail.do'
  const params = { userToken: store.getters.userToken, ...data }

  const response = await api.post(url, params)
  return response
}

export const getIndustryTrend = async function (data = {}) {
  const url = '/industry/industrynews.do'
  const params = { userToken: store.getters.userToken, ...data }

  const response = await api.post(url, params)
  return response
}

export const getCompanyTrend = async function (data = {}) {
  const url = '/industry/companys/list2.do'
  const params = { userToken: store.getters.userToken, ...data }

  const response = await api.post(url, params)
  return response
}

export const getProductTrend = async function (data = {}) {
  const url = '/industry/products/list2.do'
  const params = { userToken: store.getters.userToken, ...data }

  const response = await api.post(url, params)
  return response
}

export const getTenderTrend = async function (data = {}) {
  const url = '/industry/zhaobiao/list2.do'
  const params = { userToken: store.getters.userToken, ...data }

  const response = await api.post(url, params)
  return response
}

export const getProductClassify = async function (data = {}) {
  const url = '/industry/products/get.do'
  const params = { userToken: store.getters.userToken, ...data }

  const response = await api.post(url, params)
  return response
}

export const getTenderClassify = async function (data = {}) {
  const url = '/industry/zhaobiao/get.do'
  const params = { userToken: store.getters.userToken, ...data }

  const response = await api.post(url, params)
  return response
}

export const getSearch = async function (data = {}) {
  const url = '/comb/search.do'
  const params = { userToken: store.getters.userToken, ...data }

  const response = await api.post(url, params)
  return response
}

export const saveCollectArticles = async function (data = {}) {
  const url = '/comb/bookmark/save.do'
  const params = { userToken: store.getters.userToken, Classfi: 1, ...data }

  const response = await api.post(url, params)
  return response
}

export const deleteCollectArticles = async function (data = {}) {
  const url = '/comb/bookmark/del.do'
  const params = { userToken: store.getters.userToken, ...data }

  const response = await api.post(url, params)
  return response
}

export const getCollectArticles = async function (data = {}) {
  const url = '/comb/bookmark/get.do'
  const params = { userToken: store.getters.userToken, classfi: 1, ...data }

  const response = await api.post(url, params)
  return response
}

export const judgeCollectArticles = async function (data = {}) {
  const url = '/comb/bookmark/marked.do'
  const params = { userToken: store.getters.userToken, classfi: 1, ...data }

  const response = await api.post(url, params)
  return response
}
