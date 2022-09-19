import Cookies from 'js-cookie'
import userService from './userService'
import { COOKIES_STORAGE, OBSERVER_KEY } from 'common/constants'
import ReduxServices from 'common/redux'
import Observer from 'common/observer'
import { convertUnixDurationToDate } from 'common/function'
const checkObject = (object) => {
  if (object !== {} && Object.keys(object || {}).length > 0 && object) {
    return true
  }
  return false
}
const checkEspecially = async (name = COOKIES_STORAGE.ACCESS_TOKEN, isReset = false) => {
  return cookiesService.getDataFromNameCookies(COOKIES_STORAGE.REFESH_TOKEN).then(async (refeshToken) => {
    if (refeshToken) {
      if (name === COOKIES_STORAGE.ACCESS_TOKEN) {
        const res = await userService.refeshAccessToken(refeshToken)
        cookiesService.setMutilDataCookie(res)
        return cookiesService.getDataFromNameCookies(name)
      } else {
        return refeshToken
      }
    } else {
      if (isReset) {
        await ReduxServices.resetUser()
        await setTimeout(async () => {
          await Observer.emit(OBSERVER_KEY.LOGOUT)
        }, 1500)
      }
      return null
    }
  })
}

const cookiesService = {
  getDataFromNameCookies: async function (name) {
    let temp = ''
    if (name === COOKIES_STORAGE.ACCESS_TOKEN || name === COOKIES_STORAGE.REFESH_TOKEN) {
      temp = await Cookies.get(name)
      if (!checkObject(temp)) {
        return null
      }
      return JSON.parse(await temp)?.token
    } else {
      if (name === COOKIES_STORAGE.EXP_ACCESS_TOKEN) {
        temp = await Cookies.get(COOKIES_STORAGE.ACCESS_TOKEN)
        if (!checkObject(temp)) {
          return null
        }
        return JSON.parse(await temp)?.payload?.exp
      } else {
        temp = await Cookies.get(COOKIES_STORAGE.REFESH_TOKEN)
        if (!checkObject(temp)) {
          return null
        }
        return JSON.parse(await temp)?.payload?.exp
      }
    }
  },
  setDataCookie: async function (key, value) {
    const dataTemp = JSON.stringify(value)
    Cookies.set(key, dataTemp, { expires: convertUnixDurationToDate(value?.payload?.exp ?? undefined), secure: true })
  },
  setMutilDataCookie: async function (data) {
    for (const key in data) {
      cookiesService.setDataCookie(key, data[key])
    }
  },
  getCookiesByName: async function (name = COOKIES_STORAGE.ACCESS_TOKEN, isReset = true) {
    return cookiesService.getDataFromNameCookies(name).then(async (cookies) => {
      if (cookies) {
        return cookies
      } else {
        return checkEspecially(name, isReset)
      }
    })
  },
  setCookiesByName: async function (name = COOKIES_STORAGE.ACCESS_TOKEN, data) {
    Cookies.set(name, data, { secure: true })
  },
  checkHasCookies: async function (name = COOKIES_STORAGE.ACCESS_TOKEN, isReset = false) {
    cookiesService.getDataFromNameCookies(name).then(async (cookies) => {
      if (!cookies) {
        if (name === COOKIES_STORAGE.ACCESS_TOKEN) {
          const res = await checkEspecially(name, isReset)
          if (res) {
            cookiesService.setMutilDataCookie(res)
          }
        } else {
          await checkEspecially(name, isReset)
        }
      }
    })
  },
  getAllCookie: async function () {
    const cookies = Cookies.get()
    if (cookies !== {} && Object.keys(cookies).length > 0) {
      return cookies
    } else {
      const res = await checkEspecially()
      cookiesService.setMutilDataCookie(res)
      return res
    }
  }

}

export default cookiesService
