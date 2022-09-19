import { message, Button, Avatar, Upload, Form } from 'antd'
import ImgCrop from 'antd-img-crop'
import React, { useEffect, useState } from 'react'
import CommonService from 'services/commonService'
import UserService from 'services/userService'
import { detectImageUrl } from 'common/function'
import { Router } from 'common/routes'
import ReduxServices from 'common/redux'
import { images } from 'config/images'
import { useSelector } from 'react-redux'
import { EditOutlined } from '@ant-design/icons'
import axios from 'axios'
import {
  Container,
  ContainerAvatar,
  ButtonSave,
  ImgBtnEdit,
  Description, InputText, TitleUserName, TitleModal
} from './styled'
import cookiesService from 'services/cookiesService'
import Input from 'pages/Components/Input'

const EditAvatar = (props) => {
  const { userData, onSaveUpdate } = props
  const userInfo = useSelector(state => state.userInfo)
  const messages = useSelector(state => state.locale.messages)
  const {
    type = 0,
    textOld,
    onSave
  } = props
  const [textNew, setTextNew] = useState(textOld)
  // use state
  const [avatar, setAvatar] = useState('')
  const [avatarPreview, setAvatarPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState({
    name: '',
    type: '',
    base64: ''
  })
  const [formAddress] = Form.useForm()
  const [formData, setFormData] = useState({
    address: textOld
  })
  const onCheckAddress = (rule, value) => {
    console.log('onCheckAddress', rule, value)
    if (value === '') {
      return Promise.reject('Please enter user name')
    }
  }
  // effect
  useEffect(() => {
    setAvatarPreview(
      userInfo?.image ? detectImageUrl(userInfo?.image) : images.avatarDefault
    )
  }, [])

  // function
  const onChangeAvatar = async (file) => {
    if (file.size >= 5242880) {
      message.error(messages.pleaseUnder5mb)
    } else {
      const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => {
            setFileName({
              name: file.name,
              type: file.type,
              base64: reader.result
            })
            resolve(reader.result)
          }
          reader.onerror = (error) => reject(error)
        })
      }

      console.log('file', file)
      const base64 = await getBase64(file)
      const base64Script = base64.split('base64,')[1]
      setAvatarPreview(base64)
      setAvatar(base64Script)
    }
  }
  const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data)
    const byteArrays = []

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize)

      const byteNumbers = new Array(slice.length)
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i)
      }

      const byteArray = new Uint8Array(byteNumbers)
      byteArrays.push(byteArray)
    }

    const blob = new Blob(byteArrays, { type: contentType })
    return blob
  }
  const onSubmit = async () => {
    setLoading(true)
    let newUserData = {
      image: detectImageUrl(userInfo?.image)
    }
    const form = new FormData()
    if (avatar !== '') {
      // eslint-disable-next-line no-path-concat
      console.log('avatar', avatar.substring(0, 20))
      const blob = b64toBlob(avatar, fileName.type)
      form.append('file', blob, fileName.name)

      // console.log('form.getHeaders():', form.getHeaders())
      const resUpload = await CommonService.uploadFile(form)
      console.log({ resUpload })
      if (resUpload && resUpload.status === 'success') {
        newUserData.image = resUpload.data.Hash
      }
    }
    let res = await UserService.updateUser(newUserData, await cookiesService.getCookiesByName())

    if (res && res.address) {
      ReduxServices.setUserInfo()
    }
    onSaveUpdate()
    setLoading(false)
  }
  const onUploadFail = () => {
    message.error(messages.setting.uploadFailed)
  }
  const updateTextNew = (text) => {
    if (text.target.value?.toString()?.length <= 50) {
      setTextNew(text.target.value)
    }
  }
  return (
    <Container>
      <TitleModal>{messages.userProfile.editProfile}</TitleModal>
      <ContainerAvatar>
        <Avatar size={150} src={avatarPreview} className='MT15' />
      </ContainerAvatar>
      <ImgCrop
        aspect={1}
        quality={1}
        modalOk={messages.common.ok}
        modalCancel={messages.common.cancel}
        onUploadFail={onUploadFail}
        onModalOk={(file) => onChangeAvatar(file)}
      >
        <Upload showUploadList={false} accept='.png,.jpg,.jpeg,.gif,.svg'>
          <label className='edit-avatar' htmlFor='avatar'>
            <ImgBtnEdit src={images.icPenDarkMode} />
            {/* <img src={images.icPenDarkMode} width={20} className='editAvatar-btn' /> */}
          </label>
        </Upload>
      </ImgCrop>
      <Description>
        <TitleUserName>
          {messages.userProfile.username.toUpperCase()}
        </TitleUserName>
        {/* <Input
          placeholder={messages.userProfile.inputYourName}
          onChange={updateTextNew}
          value={textNew}
        />
        <p style={{ textAlign: 'right', margin: 0 }}>{textNew?.length}/50</p> */}
        <Form
          form={formAddress}
          initialValues={formData}
          onValuesChange={(changedValues, allValue) => setFormData(allValue)}
        >
          <Form.Item name={'address'} rules={[{ validator: onCheckAddress }]}>
            <Input
              className='MT20'
              maxLength={50}
              placeholder='Enter User Name'
              onChange={updateTextNew}
              value={textNew}
              defaultValue='tetx'
            />
          </Form.Item>
          <p style={{ textAlign: 'right', margin: 0, color: 'white' }}>{textNew?.length}/50</p>
        </Form>
      </Description>
      <ButtonSave
        disabled={!textNew}
        loading={loading}
        onClick={() => {
          onSave(type, textNew)
          onSubmit()
        }}
      >
        {'Update'}
      </ButtonSave>
    </Container>
  )
}
export default EditAvatar
