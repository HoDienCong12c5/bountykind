import React from 'react'
import Observer from 'common/observer'
import { OBSERVER_KEY } from 'common/constants'
import reactStringReplace from 'react-string-replace'

const SwitchNotification = (props) => {
  const { type, locale, callback = null } = props

  const onLogin = () => {
    Observer.emit(OBSERVER_KEY.SIGN_IN, callback)
  }

  const showScreen = () => {
    switch (type) {
    case 'no-login':
      return (
        <div>{reactStringReplace(locale.messages.errors.noLogin, locale.messages.errors.noLogin, (match, i) => (<span key={i} onClick={onLogin} className='text text-color-1 cursor pointer'>{match}</span>))}</div>
      )
    case 'not-allowed':
      return (
        <div>{locale.messages.errors.notAllowed}</div>
      )
    }
  }

  return (
    showScreen()
  )
}

export default SwitchNotification
