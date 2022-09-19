import React from 'react'
import {
  DiscountBox,
  DiscountBoxTop,
  DiscountBoxBottom
} from './style'

const StatusBox = ({ children, left = -20 }) => {
  return (
    <DiscountBox left={left}>
      <DiscountBoxTop>
        {children}
      </DiscountBoxTop>
      <DiscountBoxBottom />
    </DiscountBox>
  )
}

export default StatusBox
