import React from 'react'
import { Modal } from 'antd'
import './style.scss'
import { images } from 'config/images'
class MyModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isShowModal: false,
      modalContent: null,
      config: {
        modalWidth: 480,
        closable: true,
        wrapClassName: ''
      }
    }
  }

  componentDidMount () {
    // code here
  }

  openModal = (modalContent, config = { modalWidth: 500, closable: true, wrapClassName: '', maskStyle: {}, onAfterClose: null, isEscClose: true }) => {
    this.setState({
      isShowModal: true,
      modalContent,
      config
    })
  }

  closeModal = () => {
    this.setState({
      isShowModal: false,
      modalContent: null
    })
    const { customClose } = this.props
    customClose && customClose()
  }

  render () {
    const { isShowModal, modalContent, config } = this.state
    return (
      <Modal
        keyboard={config.isEscClose}
        wrapClassName={`modal-base ${config.wrapClassName}`}
        width={config.modalWidth}
        title={null}
        footer={null}
        centered
        visible={isShowModal}
        onOk={null}
        onCancel={this.closeModal}
        closable={config.closable}
        maskClosable={config.closable}
        maskStyle={config.maskStyle}
        afterClose={() => {
          config.onAfterClose && config.onAfterClose()
        }}
        closeIcon={<img src={images.icClose} />}
      >
        {modalContent && modalContent}
      </Modal>
    )
  }
}

export default MyModal
