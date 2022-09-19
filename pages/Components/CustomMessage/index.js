import React from 'react'
import { message } from 'antd'
import './style.scss'
import { images } from 'config/images'

const CustomMessage = ({ text, icon, closeIcon = images.icClose }) => {
  return (
    <div className='custom-msg-container'>
      <div className='left'>
        <div className='icon'>
          <img src={icon} width={20} />
        </div>
        <div className='message'>
          <p>{text}</p>
        </div>
      </div>
      <img
        onClick={() => {
          message.destroy()
        }}
        src={closeIcon} width={12} />
    </div>
  )
}

export default CustomMessage
