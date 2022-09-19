import React, { useState } from 'react'
import { Input } from 'antd'
import { validateAddress } from 'common/function'
import './style.scss'

const AddressInput = ({ value = '', onChange, placeholder = '' }) => {
  const [address, setAddress] = useState('')
  const [isError, setError] = useState(false)

  const triggerChange = changedValue => {
    if (onChange) {
      onChange({
        address,
        ...value,
        ...changedValue
      })
    }
  }

  const onAddressChange = e => {
    const newAddress = e.target.value.toString()
    if (newAddress.length === 0) {
      setAddress('')
      setError(false)
      triggerChange({
        address: '',
        isError: false
      })
    } else {
      let error = false
      if (!validateAddress(newAddress) || newAddress.length < 42) {
        error = true
      }
      setAddress(newAddress)
      setError(error)
      triggerChange({
        address: newAddress,
        isError: error
      })
    }
  }

  return (
    <div className='address-input-wrapper'>
      <Input
        type='text'
        placeholder={placeholder}
        value={value.address || address}
        onChange={onAddressChange}
      />
      {isError && <span className='address-input-error'>Invalid address (42 Hexadecimal start with 0x).</span>}
    </div>
  )
}

export default AddressInput
