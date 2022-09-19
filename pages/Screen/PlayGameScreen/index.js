/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-hooks/exhaustive-deps */
import './style.scss'
import { useEffect, useRef, useState } from 'react'
import ReduxServices from 'common/redux'
import WalletConnectServices from 'controller/WalletConnect'
import { Unity, useUnityContext } from 'react-unity-webgl'
import { useSelector } from 'react-redux'
import Observer from 'common/observer'
import { OBSERVER_KEY, CONNECTION_METHOD } from 'common/constants'
import useAuth from 'hooks/useAuth'
import { Router } from 'common/routes'
import Refill from 'pages/Components/Modal/Refill'
import Web3Services from 'controller/Web3'
import MyModal from 'pages/Components/MyModal'
import { useGetUserGameInfo } from 'hooks/useGetUserGameInfo'
import cookiesService from 'services/cookiesService'
export function PlayGameScreen ({ exit }) {
  const myModal = useRef(null)
  const tokenBase = useSelector(state => state.settingRedux?.tokenBase)
  const energyContract = useSelector(state => state.settingRedux?.bsc?.contract_energy)
  const [YuToken, setYuToken] = useState({})
  const [EnergyToken, setEnergyToken] = useState({})
  const [unityConfig, setUnityConfig] = useState({
    productName: 'My Game',
    productVersion: '1.0.0',
    companyName: 'Bacoor',
    loaderUrl: 'static/unitybuild/Build/Build.loader.js',
    dataUrl: 'static/unitybuild/Build/Build.data',
    frameworkUrl: 'static/unitybuild/Build/Build.framework.js',
    codeUrl: 'static/unitybuild/Build/Build.wasm',
    streamingAssetsUrl: 'static/unitybuild/Build/streamingassets',
    webglContextAttributes: {
      preserveDrawingBuffer: true
    }
  })

  const {
    unityProvider,
    isLoaded,
    loadingProgression,
    sendMessage,
    addEventListener,
    removeEventListener,
    unload
  } = useUnityContext(unityConfig)
  const userData = useSelector((state) => state.userData)
  const connectionMethod = useSelector((state) => state.connectionMethod)
  const { userGameInfo } = useGetUserGameInfo()
  const { isSigned } = useAuth()
  useEffect(() => {
    if (isLoaded) {
      addEventListener('canvas', handleOnUnityCanvas)
      addEventListener('Login', handleLogin)
      addEventListener('Logout', handleLogout)
    }
    if (userData) {
      addEventListener('Refill', handleRefill)
    }
    return function () {
      removeEventListener('canvas', handleOnUnityCanvas)
      removeEventListener('Login', handleLogin)
      removeEventListener('Logout', handleLogout)
      removeEventListener('Refill', handleRefill)
      setUnityConfig({})
    }
  }, [addEventListener, removeEventListener, isLoaded, isSigned])

  useEffect(() => {
    if (userData) {
      getToken('yu')
      getToken('energy')
    }
    //
  }, [userGameInfo?.yuPoint, userGameInfo?.energy, userData])

  useEffect(() => {
    const handleExit = async (url) => {
      if (url !== '/playGame') {
        sendMessage('Global Manager', 'Logout')
      }
    }
    Router.events.on('routeChangeComplete', handleExit)

    return () => {
      Router.events.off('routeChangeComplete', handleExit)
    }
  }, [unload])

  function handleLogin () {
    if (isSigned) {
      handleLoginSuccess()
    } else {
      Observer.emit(OBSERVER_KEY.SIGN_IN)
    }
  }

  function handleLogout () {
    if (connectionMethod === CONNECTION_METHOD.WALLET_CONNECT) {
      WalletConnectServices.killSession()
    } else {
      ReduxServices.resetUser()
    }
  }

  function handleOnUnityCanvas (canvas) {
    canvas.setAttribute('role', 'unityCanvas')
  }

  const convertObjToJSON = (object) => {
    return JSON.stringify(object)
  }

  const getToken = async (type) => {
    if (type === 'yu') {
      const balance = await Web3Services.getTokenBalance(userData.address, tokenBase.address)
      setYuToken({
        amount: balance,
        symbol: tokenBase.symbol,
        contract: tokenBase.address
      })
    } else {
      const balance = await Web3Services.getTokenBalance(userData.address, energyContract)
      const symbolTemp = await Web3Services.getTokenSymbol(energyContract)
      if (balance && symbolTemp) {
        setEnergyToken({
          amount: balance,
          symbol: 'Energy',
          contract: energyContract
        })
      }
    }
  }

  const handleRefill = async (type) => {
    let EnergyToken = null
    let YuToken = null
    const enegeryBalance = await Web3Services.getTokenBalance(userData.address, energyContract)
    const symbolTemp = await Web3Services.getTokenSymbol(energyContract)
    if (enegeryBalance && symbolTemp) {
      EnergyToken = {
        amount: enegeryBalance,
        symbol: 'Energy',
        contract: energyContract
      }
    }
    const balance = await Web3Services.getTokenBalance(userData.address, tokenBase.address)
    YuToken = {
      amount: balance,
      symbol: tokenBase.symbol,
      contract: tokenBase.address
    }
    myModal.current.openModal(
      <Refill
        type={2}
        YuToken={YuToken}
        EnergyToken={EnergyToken}
        myModal={myModal}
      />, { modalWidth: 500 })
  }
  const handleLoginSuccess = async () => {
    await cookiesService.checkHasCookies()
    const loginData = {
      token: await cookiesService.getCookiesByName(),
      address: userData?.address,
      img: userData?.image ?? '',
      usernamme: userData?.username
    }
    sendMessage(
      'Global Manager',
      'LoginSuccess',
      convertObjToJSON({ ...loginData })
    )
  }

  useEffect(() => {
    if (isLoaded) {
      if (isSigned) {
        handleLoginSuccess()
      } else {
        sendMessage('Global Manager', 'Logout')
      }
    }
  }, [userData, isLoaded, isSigned])

  return (
    <>
      <div className='unity-wrapper'>
        <div className='unity-container'>
          {isLoaded === false && (
            <div className='loading-overlay'>
              <div className='progress-bar'>
                <div
                  className='progress-bar-fill'
                  style={{ width: loadingProgression * 100 + '%' }}
                />
              </div>
            </div>
          )}
          <Unity
            id='unity-canvas'
            className='unity-canvas'
            unityProvider={unityProvider}
          />
        </div>
      </div>
      <MyModal ref={myModal} />
   </>
  )
}

export default () => <></>
