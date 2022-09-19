import { Input, Form } from 'antd'
import styled from 'styled-components'
import { images } from 'config/images'
import React, { useState, useRef, createRef } from 'react'
const InputContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  font-family: Inter, sans-serif;
  @media screen and (max-width: 768px) {
    width: 70%;
    }
`
const InputCustom = styled(Input)`
  padding: 5px;
  font-size: 11px;
  padding-left: 10px;
`
const FormEmail = ({ form, formData, submitFormEmail, setFormData }) => {
  return (
    <Form
      form={form}
      initialValues={formData}
      onValuesChange={(changedValues, allValue) => setFormData(allValue)}
      onFinish={submitFormEmail}
      label='E-mail'
      rules={[
        {
          type: 'email',
          message: 'The input is not valid E-mail!'
        },
        {
          required: true,
          message: 'Please input your E-mail!'
        }
      ]}
    >
      <InputContainer>
        <InputCustom
          className='input-email'
          placeholder='Email@example.com'
          autoComplete='off'
          type={'email'}
          // suffix={<span style={{ color: 'white', fontWeight: '600' }}>$</span>}
        />
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignSelf: 'stretch',
            padding: 10
          }}
        >
          <img src={images.home.iconRightBtn} />
        </div>
      </InputContainer>
    </Form>
  )
}
export default FormEmail
