import { Input, message, Button, Avatar, Upload } from 'antd'
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
import {
  Container,
  ContainerAvatar,
  ButtonSave,
  ImgBtnEdit
} from './styled'
import cookiesService from 'services/cookiesService'
const EditAvatar = (props) => {
  const { userData, onSaveUpdate } = props
  const userInfo = useSelector(state => state.userInfo)
  const messages = useSelector(state => state.locale.messages)

  // use state
  const [avatar, setAvatar] = useState('')
  const [avatarPreview, setAvatarPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [newAvatar, setNewAvatar] = useState({
    name: '',
    type: ''
  })

  // effect
  useEffect(() => {
    setAvatarPreview(userInfo?.image)
  }, [])

  // function
  const onChangeAvatar = async (file) => {
    alert('')
    if (file.size >= 5242880) {
      message.error(messages.pleaseUnder5mb)
    } else {
      const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => resolve(reader.result)
          reader.onerror = (error) => reject(error)
        })
      }
      setNewAvatar({
        name: file.name,
        type: file.type
      })
      console.log('file', file)
      const base64 = await getBase64(file)
      const base64Script = base64.split('base64,')[1]
      setAvatarPreview(base64)
      setAvatar(base64Script)
    }
  }
  const onSubmit = async () => {
    setLoading(true)
    let newUserData = {
      image: userData.image
    }
    if (avatar !== '') {
      const formData = new FormData()
      // formData.append('file', Buffer.from(avatar), newAvatar.name)
      // const resUpload = await CommonService.uploadFile(formData)
      console.log('resUpload', formData)
      // const resUpload = await CommonService.uploadFile({ base64: avatar })
      // if (resUpload && resUpload.imageUrl) {
      //   newUserData.image = resUpload.imageUrl
      // }
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
  return (
    <Container >
      <ContainerAvatar >
        <Avatar size={150} src={detectImageUrl(avatarPreview)} className='MT15' />
      </ContainerAvatar>
      <ImgCrop
        aspect={1}
        quality={1}
        modalOk={messages.common.ok}
        modalCancel={messages.common.cancel}
        onUploadFail={onUploadFail}
        onModalOk={(file) => onChangeAvatar(file)}
      >
        <Upload
          showUploadList={false}
          accept='.png,.jpg,.jpeg,.gif,.svg'
        >
          <label className='edit-avatar' htmlFor='avatar'>
            <ImgBtnEdit src={images.icPenDarkMode} />
            {/* <img src={images.icPenDarkMode} width={20} className='editAvatar-btn' /> */}
          </label>
        </Upload>
      </ImgCrop>
      <ButtonSave loading={loading} onClick={onSubmit}>{'Update'}</ButtonSave>
    </Container>
  )
}
export default EditAvatar
