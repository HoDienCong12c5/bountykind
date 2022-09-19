import React from 'react'
import Gradient from 'rgt'
const GradientText = ({ dir = 'left-to-right', from = '#dd5ee4', to = '#20e7f9', children }) => {
  // dir: 'left-to-right' | 'right-to-left' | 'top-to-bottom' | 'bottom-to-top';
  // fron: string;
  // to: string;
  return (
    <Gradient dir={dir} from={from} to={to}>
      {children}
    </Gradient>
  )
}

export default GradientText
