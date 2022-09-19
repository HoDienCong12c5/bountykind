import React from 'react'
import { StatusDiv } from './style'

const Status = (props) => {
  const { children } = props
  return (
    <StatusDiv>
      {children}
    </StatusDiv>
  )
}

export default Status
