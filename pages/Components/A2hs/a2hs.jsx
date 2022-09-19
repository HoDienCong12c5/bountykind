import React, { useState, useEffect, useRef } from 'react'
import './a2hs.css'
import { CloseOutlined } from '@ant-design/icons'
import useAuth from 'hooks/useAuth'

function A2hs ({ title, icon, onA2hsClick }) {
  const { isSigned } = useAuth()
  const [isShowBanner, setIsShowBanner] = useState(false)
  const buttonRef = useRef()
  // ---------------------
  const onCloseA2hs = () => setIsShowBanner(false)
  // ----------------------
  useEffect(() => {
    let deferredPrompt
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later.
      deferredPrompt = e
      // Update UI to notify the user they can add to home screen
      setIsShowBanner(true)

      buttonRef.current.addEventListener('click', () => {
        // hide our user interface that shows our A2HS button
        setIsShowBanner(false)
        // Show the prompt
        deferredPrompt.prompt()
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt')
          } else {
            console.log('User dismissed the A2HS prompt')
          }
          deferredPrompt = null
        })
      })
    })
  }, [])
  return (
    <div>
      {isShowBanner ? (
        <div className={`a2hs-banner ${isSigned ? 'a2hs-banner-has-footer' : ''}`}>
          <div className='a2hs-content' ref={buttonRef}>
            {icon ? <img className='a2hs-icon' src={icon} /> : null}
            <div className='a2hs-text'>
              <a onClick={onA2hsClick}>
                {title || 'Add to home screen'}
              </a>
            </div>
          </div>
          <div className='a2hs-close-btn' onClick={onCloseA2hs}>
            <CloseOutlined style={{ fontSize: '12px', color: '#000000' }} />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default A2hs
