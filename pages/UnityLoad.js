import React, { useEffect, useState } from 'react'
import { PlayGameScreen } from './Screen/PlayGameScreen'
import { Router } from 'common/routes'

const UnityLoad = () => {
  const [load, setLoad] = useState(Router.asPath === '/playGame')

  useEffect(() => {
    const handleLoad = async (url) => {
      if (url === '/playGame') {
        setLoad(true)
      }
    }
    Router.events.on('routeChangeComplete', handleLoad)

    return () => {
      Router.events.off('routeChangeComplete', handleLoad)
    }
  }, [])

  const handleExitPage = () => {
    setLoad(false)
  }

  return <div style={Router.asPath === '/playGame' ? { width: '100%', height: '100%' } : { position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', top: '0px', left: '0px' }}>
    {load && <PlayGameScreen exit={handleExitPage} />}
  </div>
}

export default UnityLoad
