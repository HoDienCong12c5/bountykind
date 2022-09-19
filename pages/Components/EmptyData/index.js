import React from 'react'

const EmptyData = ({ text = 'No Data Found' }) => {
  return (
    <div style={{ textAlign: 'center', opacity: '0.5' }}>{text}</div>
  )
}

export default EmptyData
