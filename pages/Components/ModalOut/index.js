import React, { useRef, useEffect } from 'react'
import ReduxServices from 'common/redux'
import MyModal from 'pages/Components/MyModal'
import Observer from 'common/observer'
import {
  OBSERVER_KEY
} from 'common/constants'
const ModalPoup = () => {
  return <div>index</div>
}
const ModalOut = () => {
//   ReduxServices.resetUser()
  const myModal = useRef(null)
  const openLogOut = () => {
    myModal?.current && myModal && myModal.current.openModal(<ModalPoup />)

    return <div>
      <MyModal ref={myModal} />
    </div>
  }
  useEffect(() => {
    Observer.on(OBSERVER_KEY.LOGOUT, openLogOut)
    return function cleanup () {
      Observer.removeListener(OBSERVER_KEY.LOGOUT, openLogOut)
    }
  }, [])
}
export default ModalOut
