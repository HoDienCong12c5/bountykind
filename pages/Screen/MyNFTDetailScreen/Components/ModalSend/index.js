
import React, { useState, useEffect } from 'react'
import { images } from 'config/images'
import { useSelector } from 'react-redux'
import {
  Container,
  Title,
  Description,
  Button,
  InputCustoms,
  Content,
  TitleContent,
  InputWrapper,
  FormContainer,
  TextDescription
} from './styled'
import { validateAddress } from 'common/function'
import { Form } from 'antd'
import Input from 'pages/Components/Input'
const ModalSend = ({ onSend }) => {
  const [form] = Form.useForm()
  const [formData, setFormData] = useState({
    address: ''
  })
  const { messages } = useSelector(state => state.locale)
  const submit = () => {
    onSend(formData.address)
  }
  const onCheckAddress = (rule, value) => {
    if (value === '') {
      return Promise.reject(messages.form.emptyAddress)
    } else if (!validateAddress(value)) {
      return Promise.reject(messages.form.txtWarningInvalidAddess)
    }
  }
  return (
    <Container>
      <Title textTransform>{messages.myNFT.send}</Title>
      <TextDescription>
        Please enter a address to send this NFT
      </TextDescription>
      <Content>
        <TitleContent style={{ textAlign: 'left' }}>
          {`${messages.address} :`}
        </TitleContent>

        <InputWrapper>
          <FormContainer
            form={form}
            initialValues={formData}
            onValuesChange={(changedValues, allValue) => setFormData(allValue)}
          >
            <Form.Item name={'address'} rules={[{ validator: onCheckAddress }]}>
              <Input placeholder='Enter Address' maxLength={50} />
            </Form.Item>
            <p style={{ color: 'white', textAlign: 'right', margin: 0 }}>
              {formData.address.length}/50
            </p>
          </FormContainer>
        </InputWrapper>
      </Content>
      <Button
        disabled={
          !formData.address ||
          !validateAddress(formData?.address) ||
          formData?.address.length < 42
        }
        onClick={submit}
        className='MT25'
      >
        {messages.myNFT.send}
      </Button>
    </Container>
  )
}
export default ModalSend
