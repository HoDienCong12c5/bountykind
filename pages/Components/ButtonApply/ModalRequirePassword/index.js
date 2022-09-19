import React, { useState } from 'react'
import { Router } from 'common/routes'
import { Button, DescriptionModal, TitleModal } from './styled'
import { Form, Spin } from 'antd'
import { useSelector } from 'react-redux'
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons'
import scholarshipService from 'services/scholarshipService'
import { showNotification } from 'common/function'
import { images } from 'config/images'
import Input from 'pages/Components/Input'
const ModalRequirePassword = ({ closeModal, onclick, nftDetails }) => {
  const messages = useSelector(state => state.locale.messages)
  const [form] = Form.useForm()
  const [formData, setFormData] = useState({
    password: ''
  })

  const onSubmit = async () => {
    if (formData?.password) {
      try {
        const dataScholarship = await scholarshipService.postCheckCodeScholarship(nftDetails.contractAddress, nftDetails.nftId, { 'code': formData.password })
        if (dataScholarship?.message === 'success') {
          closeModal()
          onclick(dataScholarship.data)
          console.log('success')
        } else {
          console.log('dataScholarship?.message', dataScholarship?.message)
          closeModal()
        }
      } catch (error) {
        console.log('error', error)
        closeModal()
        showNotification('wrong password')
      }
    } else {
      console.log('enter password')
    }
  }
  const onCheckEmpty = (rule, value) => {
    if (value === '') {
      return Promise.reject(messages.form.emptyPassword)
    }
  }
  return (
    <>
      <TitleModal textTransform>Required Password!</TitleModal>
      <DescriptionModal>Please enter password to continue</DescriptionModal>
      <Form
        form={form}
        initialValues={formData}
        onValuesChange={(changedValues, allValue) => setFormData(allValue)}
      >
        <Form.Item name={'password'} rules={[{ validator: onCheckEmpty }]}>
          <Input
            className='MT20'
            password
            // className='input-password'
            type={'password'}
            autoComplete='off'
            placeholder='Enter Password'
            style={{ width: '100%' }}
            iconRender={(visible) =>
              visible ? (
                <img style={{ width: 26, height: 26 }} src={images.eyeOpen} />
              ) : (
                <img style={{ width: 26, height: 26 }} src={images.eyeClose} />
              )
            }
            onKeyPress={(event) => {
              if (event.target.value.length >= 9) {
                event.preventDefault()
              }
            }}
          />
        </Form.Item>
      </Form>

      <Button disabled={!formData?.password} onClick={() => onSubmit()}>
        Apply
      </Button>
    </>
  )
}
export default ModalRequirePassword
