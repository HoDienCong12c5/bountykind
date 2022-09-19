import React, { useState, useEffect, useCallback } from 'react'
import { images } from 'config/images'
import {
  Container,
  Title,
  Description,
  Button,
  ContainerCheckboxPassword,
  Checkbox,
  IconCheckbox,
  TitleCheckBox,
  TitleInput
} from './styled'
import './style.scss'
import { Form, Select } from 'antd'
import { useSelector } from 'react-redux'
import Input from 'pages/Components/Input'
import { FormContainer } from '../ModalSend/styled'

// import Select from 'react-select'
const { Option } = Select
const ModalScholarship = ({ onScholarship, dataOld }) => {
  // store
  const messages = useSelector((state) => state.locale.messages)
  // useState
  const [password, setPassword] = useState('')
  const [dayTime, setDayTime] = useState(7)
  const [formData, setFormData] = useState({
    ratio: '',
    password: '',
    lendingPeriod: '',
    comment: 'FOR CHOLARSHIP'
  })
  const [form] = Form.useForm()
  const [openInputPassword, setOpenInputPassword] = useState(false)
  // useEffect
  useEffect(() => {
    if (dataOld) {
      setFormData({ ...formData, ratio: dataOld.ratio * 100 })
      setPassword(dataOld.password)
      const convertDay = Math.floor(Number(dataOld.dayTime) / 24 / 60 / 60)
      setDayTime(convertDay)
    }
  }, [])

  const checkRatio = (rule, value) => {
    if (!value) {
      setFormData({ ...formData, ratio: -1 })
      return Promise.reject(messages.form.pleaseInputNumber)
    }
    if (Number(value) >= 0 && Number(value) <= 100) {
      if (value.toString().includes('.')) {
        return Promise.reject(messages.form.pleaseInputNumber)
      }
      setFormData({ ...formData, ratio: value })
      return Promise.resolve()
    } else {
      setFormData({ ...formData, ratio: -1 })

      return Promise.reject('Invalid ratio (from 0 to 100)')
    }
  }
  const checkCommnet = (rule, value) => {
    if (!value) {
      setFormData({ ...formData, ratio: -1 })
      return Promise.reject(messages.scholarship.enterComment)
    }
  }
  const checkLendingPeriod = (rule, value) => {
    if (!value) {
      setFormData({ ...formData, lendingPeriod: -1 })
      return Promise.reject(messages.form.pleaseInputNumber)
    }

    if (value.toString().includes('.')) {
      return Promise.reject(messages.form.pleaseInputNumber)
    }
    if (value.length > 9) {
      return Promise.reject(messages.form.maxDigits)
    }
    if (value <= 0) {
      return Promise.reject('Please enter a number larger than zero')
    }
    setFormData({ ...formData, lendingPeriod: value })
    return Promise.resolve()
  }

  const checkPassword = (rule, value) => {
    if (!value) {
      return Promise.reject(messages.scholarship.enterPassword)
    }
  }

  const onSubmit = () => {
    const { ratio, password, lendingPeriod, comment } = formData
    console.log({ formData })
    onScholarship(
      Number(ratio) * 10,
      password,
      Number(lendingPeriod) * 60,
      comment
    )
  }
  const submitForm = (data) => {
    const { ratio, password } = data
    console.log(ratio, password)
  }
  console.log({ formData })
  const checkboxPassword = () => {
    return (
      <ContainerCheckboxPassword>
        <Checkbox>
          <IconCheckbox onClick={() => {
            setOpenInputPassword(!openInputPassword)
          }}>
            {openInputPassword ? (
              <img src={images.icCheckboxActive} alt='icCheckboxActive' />
            ) : (
              <img src={images.icCheckboxInactive} alt='icCheckboxInactive' />
            )}
          </IconCheckbox>
          <TitleCheckBox>Password</TitleCheckBox>
        </Checkbox>
      </ContainerCheckboxPassword>
    )
  }
  return (
    <Container>
      <Title>{messages.scholarship.questionOffer}</Title>
      <Description>Please fill out the form below.</Description>
      <FormContainer
        style={{ width: '100%' }}
        form={form}
        initialValues={formData}
        onValuesChange={(changedValues, allValue) => setFormData(allValue)}
        onFinish={submitForm}
      >
        <TitleInput>Your share of earnings(%):</TitleInput>
        <Form.Item
          style={{ width: '100%' }}
          name={'ratio'}
          rules={[{ validator: checkRatio }]}
        >
          <Input
            type='number'
            className='input'
            autoComplete='off'
            iconRight={<div style={{ color: 'white' }}>%</div>}
            placeholder='Enter Ratio'
            onKeyPress={(event) => {
              if (event.target.value.length >= 3 && event.target.value >= 100) {
                event.preventDefault()
              }
            }}
          />
        </Form.Item>
        <TitleInput>Lending Period( minute):</TitleInput>
        <Form.Item
          style={{ width: '100%' }}
          name={'lendingPeriod'}
          rules={[{ validator: checkLendingPeriod }]}
        >
          <Input
            iconRight={<div />}
            type='number'
            className='input'
            autoComplete='off'
            placeholder='Enter Lending Period'
            // onKeyPress={(event) => {
            //   if (event.target.value.length >= 6) {
            //     event.preventDefault()
            //   }
            // }}
            // onChange={(event) => {
            //   setDayTime(Number(event.target.value))
            // }}
          />
        </Form.Item>
        {checkboxPassword()}
        {openInputPassword && (
          <Form.Item
            style={{ width: '100%' }}
            name={'password'}
            rules={[{ validator: checkPassword }]}
          >
            <Input
              password
              // className='input-password'
              type={'password'}
              autoComplete='off'
              placeholder='Enter Password'
              value={password}
              style={{ width: '100%' }}
              iconRender={(visible) =>
                visible ? (
                  <img style={{ width: 26, height: 26 }} src={images.eyeOpen} />
                ) : (
                  <img
                    style={{ width: 26, height: 26 }}
                    src={images.eyeClose}
                  />
                )
              }
              onKeyPress={(event) => {
                if (event.target.value.length >= 9) {
                  event.preventDefault()
                }
              }}
            />
          </Form.Item>
        )}
        <TitleInput>Comment: </TitleInput>

        <Form.Item name='comment' rules={[{ validator: checkCommnet }]}>
          <Input
            type='text'
            iconRight={<div />}
            textArea
            autoComplete='off'
            placeholder='Enter comment'
            maxLength={250}
            autoSize={{ minRows: 3, maxRows: 4 }}
          />
        </Form.Item>
        <p className='MT5' style={{ textAlign: 'right', color: 'white' }}>
          {formData.comment.length}/250
        </p>
      </FormContainer>

      <Button
        disabled={
          !formData.ratio ||
          Number(formData.ratio) < 0 ||
          Number(formData.ratio) > 100 ||
          (openInputPassword && !formData.password) ||
          !formData.lendingPeriod ||
          Number(formData.lendingPeriod) <= 0
        }
        onClick={onSubmit}
      >
        Offer Scholarship
      </Button>
    </Container>
  )
}
export default ModalScholarship
