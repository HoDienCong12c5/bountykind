import React, { useState, useEffect } from 'react'
import useOnlineStatus from 'hooks/useOnlineStatus'
import styled from 'styled-components'
import { MediumText, TitleText } from 'pages/Components/TextSize'
const Title = styled(TitleText)``
const Status = styled(MediumText)`
  color: ${(props) => `${props.status === 'Online' ? 'green' : 'red'}`};
`
const ModalConncetionNetwork = ({ closeModals }) => {
  const online = useOnlineStatus()
  const [status, setStatus] = useState()

  useEffect(() => {
    setStatus(online ? 'Online' : 'Offline')
    if (online) {
      setTimeout(() => closeModals(), 1000)
    }
  }, [online])
  return (
    <>
      <Title>Your network connection </Title>
      <Status status={status}>{status}</Status>
    </>
  )
}

export default ModalConncetionNetwork
