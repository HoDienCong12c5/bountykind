import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { CONNECTION_METHOD } from 'common/constants'
import { lowerCase } from 'common/function'

const useAuth = () => {
  const [isSigned, setIsSigned] = useState(false)
  const connectionMethod = useSelector(state => state.connectionMethod)
  const userData = useSelector(state => state.userData)
  const metamaskRedux = useSelector(state => state.metamaskRedux)
  const pantograph = useSelector(state => state.pantograph)
  const walletConnect = useSelector(state => state.walletConnect)
  useEffect(() => {
    let signed = false
    if (userData && userData.address) {
      switch (connectionMethod) {
      case CONNECTION_METHOD.METAMASK:
        signed = userData.isSigned && lowerCase(metamaskRedux.address) === lowerCase(userData.address)
        break
      case CONNECTION_METHOD.PANTOGRAPH:
        signed = userData.isSigned && lowerCase(pantograph.account) === lowerCase(userData.address)
        break
      case CONNECTION_METHOD.WALLET_CONNECT:
        signed = userData.isSigned && lowerCase(walletConnect.address) === lowerCase(userData.address)
        break
      }
    }
    setIsSigned(signed)
  }, [connectionMethod, userData, metamaskRedux, pantograph, walletConnect])
  return { isSigned, userAddress: isSigned ? userData?.address : null }
}

export default useAuth
