import validator from 'validator'
import moment from 'moment'
import { KEY_STORE } from './constants'
import ReduxService from 'common/redux'
import { notification, message } from 'antd'
import bigdecimal from 'bigdecimal'
import { formatters } from '@poppinss/intl-formatter'
import ModalAcceptRent from 'pages/Components/ButtonApply/ModalAcceptRent'

export const saveDataLocal = (key, data) => {
  // eslint-disable-next-line no-undef
  localStorage.setItem(key, JSON.stringify(data))
}

export const getDataLocal = (key) => {
  // eslint-disable-next-line no-undef
  return JSON.parse(localStorage.getItem(key))
}

export const removeDataLocal = (key) => {
  // eslint-disable-next-line no-undef
  localStorage.removeItem(key)
}

/**
 *
 * @param {string} description
 * @param {string} title
 * @param {string} type success|error|info|warn|open|close| at https://ant.design/components/notification/
 */
export const showNotification = (title = null, description = '', type = 'open', icon = '') => {
  let params = {
    placement: 'bottomRight',
    className: 'notification-class',
    bottom: 54,
    duration: 5,
    icon: icon || ''
  }
  if (title) {
    params['message'] = title
  }
  if (description) {
    params['description'] = description
  }
  notification[type](params)
}

export const destroyNotification = () => {
  notification.destroy()
}

export const shuffle = (array) => {
  let currentIndex = array.length
  let temporaryValue
  let randomIndex

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

export const convertObjectToArray = (objConvert) => {
  const peopleArray = Object.keys(objConvert).map(i => objConvert[i])
  return peopleArray
}

export const getLength = (value) => {
  return value ? value.length : 0
}

export const lowerCase = (value) => {
  return value ? value.toLowerCase() : value
}

export const upperCase = (value) => {
  return value ? value.toUpperCase() : value
}

export const getAuthKey = () => {
  let data = getDataLocal(KEY_STORE.SET_USER)
  return data ? data.sig + '|' + data.address : ''
}

export const validateStringNumOnly = (strNumber) => {
  var reg = /^([0-9a-zA-Z]+)$/
  return reg.test(strNumber)
}

export const validateNumber = (strNumber) => {
  const reg = /^[0-9]+(\.)?[0-9]*$/
  return reg.test(scientificToDecimal(strNumber))
}

export const validateEmail = (email) => {
  // eslint-disable-next-line no-useless-escape
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return !re.test(String(email).toLowerCase())
}

export const formatDecimalJavascript = (number) => {
  return Math.round(number * 1e12) / 1e12
}

export const roundingNumber = (number, rounding = 7) => {
  const powNumber = Math.pow(10, parseInt(rounding))
  return Math.floor(number * powNumber) / powNumber
}

export const convertBalanceToWei = (strValue, iDecimal = 18) => {
  var multiplyNum = new bigdecimal.BigDecimal(Math.pow(10, iDecimal))
  var convertValue = new bigdecimal.BigDecimal(String(strValue))
  return multiplyNum.multiply(convertValue).toString().split('.')[0]
}

export const convertWeiToBalance = (strValue, iDecimal = 18) => {
  var multiplyNum = new bigdecimal.BigDecimal(Math.pow(10, iDecimal))
  var convertValue = new bigdecimal.BigDecimal(String(strValue))
  return scientificToDecimal(convertValue.divide(multiplyNum).toString())
}

export const generateId = () => {
  let text = ''
  const possible = 'abcdefghijklmnopqrstuvwxyz'
  for (let i = 0; i < 16; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

export const trimString = (string) => {
  return string ? string.trim() : ''
}

export const isURL = (str) => {
  // let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
  // if (regexp.test(str)) {
  //   return true
  // } else {
  //   return false
  // }
  // let regexp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
  // console.log('result', regexp.test(str))
  // return regexp.test(str)
  return validator.isURL(str)
}

export const convertDateFormat = (strTimestamp) => {
  const lang = ReduxService.getCurrentLang()
  let timeStamp
  switch (lang) {
  case 'ja':
    timeStamp = moment(strTimestamp).format('YYYY年MM月DD日')
    break
  case 'cn' :
    timeStamp = moment(strTimestamp).format('YYYY年MM月DD日')
    break
  default:
    timeStamp = moment(strTimestamp).format('DD MMM YYYY')
    break
  }
  return timeStamp
}

export const calculateDiffDate = (date1 = new Date(), date2, type) => {
  const dateNow = moment(date1)
  const dateTxs = moment(date2)
  const payload = dateNow.diff(dateTxs, type)
  return payload
}

export const isValidJSONString = (str) => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

export const isObject = (value) => {
  return value && typeof value === 'object' && value.constructor === Object
}

export const scientificToDecimal = (num) => {
  const sign = Math.sign(num)
  // if the number is in scientific notation remove it
  if (/\d+\.?\d*e[+-]*\d+/i.test(num)) {
    const zero = '0'
    const parts = String(num).toLowerCase().split('e') // split into coeff and exponent
    const e = parts.pop() // store the exponential part
    let l = Math.abs(e) // get the number of zeros
    const direction = e / l // use to determine the zeroes on the left or right
    const coeffArray = parts[0].split('.')

    if (direction === -1) {
      coeffArray[0] = Math.abs(coeffArray[0])
      num = zero + '.' + new Array(l).join(zero) + coeffArray.join('')
    } else {
      const dec = coeffArray[1]
      if (dec) l = l - dec.length
      num = coeffArray.join('') + new Array(l + 1).join(zero)
    }
  }

  if (sign < 0) {
    num = -num
  }

  return num
}

export const isMobileScreen = (width = 768) => {
  return window.innerWidth < width
}

export const checkIsSigned = (userData, metamaskRedux) => {
  if (userData && metamaskRedux) {
    return userData.isSigned && lowerCase(metamaskRedux.account) === lowerCase(userData.address)
  } else {
    return false
  }
}

export const getCurrentBrowserLanguage = () => {
  let language = navigator.language.toLowerCase()
  switch (language) {
  case 'en-us':
  case 'en':
    language = 'en'
    break
  case 'ja-jp':
  case 'ja':
  case 'jp':
    language = 'ja'
    break
  case 'zh-cn':
  case 'zh':
  case 'cn':
    language = 'cn'
    break
  case 'vi-vn':
  case 'vi':
    language = 'vi'
    break
  }
  return language
}

export const convertAddressArrToString = (arrAddress, numStart = 4, numEnd = 4) => {
  if (arrAddress.length === 1) {
    return arrAddress[0].substring(0, numStart) + '...' + arrAddress[0].substring(arrAddress[0].length - numEnd, arrAddress[0].length)
  } else if ((arrAddress.length > 1)) {
    let stringTemp = ''
    arrAddress.map((item, index) => {
      index !== arrAddress.length - 1 ? stringTemp += convertAddressArrToString([item]) + '\n' : stringTemp += convertAddressArrToString([item])
    })
  }
}

export const scrollTop = () => {
  if (window) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

/**
* NAME: countDots
* PARAMS: strString, strLetter
* Count dots in string receive from user input
*/
export const countDots = (strString, strLetter) => {
  let string = strString.toString()
  return (string.match(RegExp(strLetter, 'g')) || []).length
}

export const getBase64FromBlob = (blob) => {
  return new Promise((resolve, reject) => {
    var reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onloadend = function () {
      var base64data = reader.result
      resolve(base64data)
    }
  })
}

export const isUserDeniedTransaction = (err = null) => {
  err = isObject(err) ? err : { message: err ? err.toString() : '' }
  const deninedMsg = 'User denied transaction signature'
  const rejectReq = 'Failed or Rejected Request'
  return (err.message && err.message.includes(deninedMsg)) || (err.message && err.message.includes(rejectReq)) || (err.stack && err.stack.includes(deninedMsg))
}

export const numberWithCommas = (x) => {
  var parts = x.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

export const isNotEnoughGas = (err = null) => {
  err = isObject(err) ? err : { message: err.toString() }
  const outOfGasMsg = 'gas required exceeds allowance'
  return (err.message && err.message.includes(outOfGasMsg)) || (err.stack && err.stack.includes(outOfGasMsg))
}

export const validateAddress = (strAddress) => {
  var reg = ''
  if (!strAddress.startsWith('0x')) {
    return false
  }

  if (countDots(strAddress, '\\x') > 1) {
    reg = /^([A-Fa-f0-9_]+)$/
  } else {
    reg = /^([A-Fa-f0-9_x]+)$/
  }

  return reg.test(strAddress)
}

export const isBottomElement = (el) => {
  return el && el.getBoundingClientRect().bottom <= window.innerHeight
}

export const copyToClipboard = (text, title) => {
  const tmp = document.createElement('input')
  tmp.value = text
  document.body.appendChild(tmp)
  tmp.select()
  document.execCommand('copy')
  tmp.remove()
  message.success(title ?? 'Copied!')
}

export const viewExternal = (url) => {
  window.open(url, '_blank')
}

export const detectImageUrl = (url) => {
  if (!url || url === '') return ''
  const setting = ReduxService.getSettingRedux()
  if (url?.startsWith('https://ipfs')) {
    return encodeURI(url)
  } else {
    return encodeURI('https://ipfs.pantograph.app/ipfs/' + url)
  }
}

export const detectVideoUrl = (url) => {
  if (!url || url === '') return ''
  const setting = ReduxService.getSettingRedux()
  if (url?.startsWith('https://ipfs')) {
    return encodeURI(url)
  } else {
    return encodeURI('https://ipfs.pantograph.app/ipfs/' + url)
  }
}

export const detectContentLang = (lang = 'en', contentEn = '', contentJa = '', contentCn = '') => {
  switch (lang) {
  case 'en':
    return contentEn || ''
  case 'ja':
    return contentJa || contentEn
  case 'cn':
    return contentCn || contentEn
  default:
    return contentEn || ''
  }
}

export const ellipsisAddress = (
  address,
  prefixLength = 13,
  suffixLength = 4
) => {
  return `${address.substr(0, prefixLength)}...${address.substr(
    address.length - suffixLength,
    suffixLength
  )}`
}

export const detectTransaction = (txhash) => {
  if (parseInt(process.env.WEB3_NETWORK_ID_ALLOWED) === 97) {
    return `https://devnet.bscscan.com/tx/${txhash}`
  } else {
    return `https://bscscan.com/tx/${txhash}`
  }
}
const relativeFormatter = (time, unit) =>
  formatters.relative('en-US', { }).format(Math.ceil(time), unit)

export const timestampToDisplayRelativeDate = (timestamp) => {
  const SECONDS_PER_MINUTE = 60
  const SECONDS_PER_HOUR = 60 * SECONDS_PER_MINUTE
  const SECONDS_PER_DAY = 24 * SECONDS_PER_HOUR
  const SECONDS_PER_MONTH = 30 * SECONDS_PER_DAY
  const SECONDS_PER_YEAR = 12 * SECONDS_PER_MONTH
  const SECONDS_PER_WEEK = 604800
  // const secAgo = new Date(timestamp).valueOf()
  const secAgo = timestamp
  if (secAgo < SECONDS_PER_MINUTE) return relativeFormatter(secAgo, 'seconds')
  if (secAgo < SECONDS_PER_HOUR) return relativeFormatter(secAgo / SECONDS_PER_MINUTE, 'minutes')
  if (secAgo < SECONDS_PER_DAY) return relativeFormatter(secAgo / SECONDS_PER_HOUR, 'hours')
  if (secAgo < SECONDS_PER_WEEK) return relativeFormatter(secAgo / SECONDS_PER_DAY, 'day')
  if (secAgo < SECONDS_PER_MONTH) return relativeFormatter(secAgo / SECONDS_PER_WEEK, 'week')
  if (secAgo < SECONDS_PER_YEAR) return relativeFormatter(secAgo / SECONDS_PER_MONTH, 'month')

  return relativeFormatter(secAgo / SECONDS_PER_YEAR, 'year')
  // return relativeFormatter(secAgo / SECONDS_PER_MINUTE, 'minutes')
}
export const convertUnixDurationToDate = (value) => {
  return moment.unix(value).toDate()
}
export const openMyModal = (myModal, modal, options = {}) => {
  myModal?.current && myModal && myModal.current.openModal(modal, options)
}
