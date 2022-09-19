import React, { useState } from 'react'
import { Router } from 'common/routes'
import { Button } from './styled'
import { Form, Spin } from 'antd'
import { useSelector } from 'react-redux'
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons'
import { images } from 'config/images'
import Input from 'pages/Components/Input'

const ModalRequirePassword = ({ closeModal, onclick }) => {
  const messages = useSelector(state => state.locale.messages)
  const [form] = Form.useForm()
  const [formData, setFormData] = useState({
    password: ''
  })
  // const userData = useSelector((state) => state.userData)
  // const showSellStartedModal = (modalData = '', title = 'Your sending has started') => {
  //   myModal.current.openModal(<StartedModal title={title} modalData={modalData} />, {
  //     wrapClassName: 'started-modal',
  //     modalWidth: 500
  //   })
  // }
  // const callbackBeforeDone = () => {
  //   showSellStartedModal(nftDetails)
  // }
  // const callbackAfterDone = (text) => {
  //   showSellSuccessModal(nftDetails)
  // }
  // const callbackRejected = (err) => {
  //   closeModal()
  //   if (!isNotEnoughGas(err)) {
  //     if (isUserDeniedTransaction(err)) {
  //       showNotification(messages.errors.deniedTransaction)
  //     } else {
  //       showNotification(messages.errors.somethingWrong)
  //     }
  //   } else {
  //     showNotification(messages.errors.notEnoughGas)
  //   }
  // }
  const onSubmit = async () => {
    if (formData.password === '123') {
      closeModal()
      onclick()
    } else {
      console.log('wrong pass')
    }
  }
  const onCheckEmpty = (rule, value) => {
    if (value === '') {
      return Promise.reject(messages.form.emptyPassword)
    }
  }
  return (
    <>
      <div
        style={{
          marginBottom: 20,
          textAlign: 'center',
          fontSize: 18,
          color: 'black',
          fontWeight: 700
        }}
      >
        Required Password!!!
      </div>
      <div style={{ textAlign: 'center', fontSize: 16, color: 'black' }}>
        Please enter password to continue
      </div>
      <Form
        form={form}
        initialValues={formData}
        onValuesChange={(changedValues, allValue) => setFormData(allValue)}
        // onFinish={submitChangePrice}
        // onSubmit={onSubmit}
      >
        <Form.Item name={'password'} rules={[{ validator: onCheckEmpty }]}>
          {/* <Input
            autoComplete='off'
            type={'password'}
            onKeyPress={(event) => {
              if (event.target.value.length >= 9) {
                event.preventDefault()
              }
            }}
            className='input'
            suffix={<span style={{ color: 'white', fontWeight: '600' }}>$</span>}
          /> */}
          <Input
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
          {/* <Input.Password
            className='MT20'
            placeholder='input password'
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          /> */}
        </Form.Item>
      </Form>

      <Button disabled={!formData?.password} onClick={() => onSubmit()}>
        Apply
      </Button>
    </>
  )
}
export default ModalRequirePassword
