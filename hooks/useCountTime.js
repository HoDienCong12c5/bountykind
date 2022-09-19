import React, { useEffect, useState, useRef } from 'react'
import moment from 'moment'
import { calculateDiffDate } from 'common/function'
import { useSelector } from 'react-redux'
import useAuth from 'hooks/useAuth'
import UserService from 'services/userService'
import ReduxServices from 'common/redux'
import StorageActions from 'controller/Redux/actions/storageActions'

let id = null
const useCountTime = (
) => {
  const { isSigned } = useAuth()
  const userData = useSelector((state) => state?.userData)
  const refeshToken = async () => {
    console.log('=start refreshToken1=====================')

    UserService.refeshToken().then((res) => {
      if (res) {
        console.log('=start refreshToken=====================')
        console.log('start refreshToken', res?.accessToken)
        console.log('====================================')
        ReduxServices.callDispatchAction(StorageActions.setUserData(
          {
            ...userData,
            ...res?.accessToken?.payload,
            accessToken: res?.accessToken,
            token: res?.accessToken?.token
          }))
      }
    })
  }
  const checkTokenExpired = () => {
    if (userData?.exp !== null && isSigned && userData?.exp !== undefined) {
      const time = calculateDiffDate(moment.unix(userData.exp), Date.now(), 'second')
      if (time < 10) {
        refeshToken()
      }
    } else {
      console.log('=not refreshToken=====================')
    }
  }
  // useEffect(() => {
  //   if (userData?.exp !== null && isSigned && userData?.exp !== undefined) {
  //     const time = calculateDiffDate(moment.unix(userData.exp), Date.now(), 'second')
  //     if (time < 10) {
  //       refeshToken()
  //     }
  //   }
  //   return () => clearInterval(id)
  // }, [userData, userData?.exp, isSigned])
  return { checkTokenExpired }
}
export default useCountTime
