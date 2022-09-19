import React from 'react'
import classNames from 'classnames'
import { Button } from 'antd'
import './style.scss'

const MyButton = ({ type = 2, ...props }) => {
  const { children, className = '', fullWidth = false, isLoading = false, ...rest } = props
  return (
    <Button
      loading={isLoading}
      className={classNames(
        `${
          type === 1
            ? ' second-btn'
            : type === 2
              ? 'pri-btn'
              : type === 3 && 'three-btn'
        } ${className}`,
        { 'full-width': fullWidth }
      )}
      {...rest}
    >
      {children}
      <div className='border' />
    </Button>
  )
}

export default MyButton
