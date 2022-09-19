import React, { useEffect, useState } from 'react'
import { images } from 'config/images'
import {
  Container
} from './style'
import './style.scss'
import Loading from 'pages/Components/Loading'
import { CheckCircleOutlined } from '@ant-design/icons'
import { showNotification, numberWithCommas } from 'common/function'
import { Router } from 'common/routes'
import { useSelector } from 'react-redux'
import { Row, Col, List, Button } from 'antd'
import ReduxService from 'common/redux'
const dataTemp = {
  'data': [
    {
      '_id': '5f59ec44efd09596f9185215',
      'card_img': 'https://ipfs.pantograph.app/ipfs/QmedjGuQ3L9rMP9GdWCFuzXoyhHrZHqZfdjUXtkKwMxLdB?filename=gift_card_500.png',
      'amount': 500,
      'number': 1,
      'name': '500 YOSHIMOTOKEN',
      'name_jp': '500 よしもトークン',
      'type': 'YOSHIMOTOKEN CARD'
    },
    {
      '_id': '5f59ec44efd09596f9185224',
      'card_img': 'https://ipfs.pantograph.app/ipfs/QmW6FXgzeVTW2xSyK78YTVQy7335KLr4LTnEPxjca7tBpT?filename=gift_card_1000.png',
      'amount': 1000,
      'number': 1,
      'name': '1,000 YOSHIMOTOKEN',
      'name_jp': '1,000 よしもトークン',
      'type': 'YOSHIMOTOKEN CARD'
    },
    {
      '_id': '5f6c3ae8efd09596f9738ce3',
      'card_img': 'https://ipfs.pantograph.app/ipfs/Qmbg3HTAyYSYhav4bGRvbF2BhKEj29JMqioMqNT22rseau?filename=gift_card_3000.png',
      'amount': 3000,
      'number': 1,
      'name': '3,000 YOSHIMOTOKEN',
      'name_jp': '3,000 よしもトークン',
      'type': 'YOSHIMOTOKEN CARD'
    },
    {
      '_id': '5f6c3ae8efd09596f9738cff',
      'card_img': 'https://ipfs.pantograph.app/ipfs/QmTaLAfZ1nfQvNHM8WF55tSaurQzewPYQgyDYs66JakQnS?filename=gift_card_5000.png',
      'amount': 5000,
      'number': 1,
      'name': '5,000 YOSHIMOTOKEN',
      'name_jp': '5,000 よしもトークン',
      'type': 'YOSHIMOTOKEN CARD'
    },
    {
      '_id': '5f6c3ae8efd09596f9738d09',
      'card_img': 'https://ipfs.pantograph.app/ipfs/QmaaTFuTDr4pVVpFAZpoZ8AKHSZGKmYepdHEaBHfwsi4ss?filename=gift_card_10000.png',
      'amount': 10000,
      'number': 1,
      'name': '10,000 YOSHIMOTOKEN',
      'name_jp': '10,000 よしもトークン',
      'type': 'YOSHIMOTOKEN CARD'
    },
    {
      '_id': '5f9fe336efd09596f94a0dee',
      'card_img': 'https://ipfs.pantograph.app/ipfs/QmYywtsk4NspidCJ54GcFxV547cc3crjuRsTyEaV7ijVKm?filename=gift_card_30000.png',
      'amount': 30000,
      'number': 1,
      'name': '30,000 YOSHIMOTOKEN',
      'name_jp': '30,000 よしもトークン',
      'type': 'YOSHIMOTOKEN CARD'
    }
  ]
}

const GameScreen = () => {
  const [loading, setLoading] = useState(true)
  // const [cardSelected, setCardSelected] = useState([])
  const ffeTokenRedux = useSelector(state => state.ffeTokenRedux)
  const [cardList, setCardList] = useState([])
  useEffect(() => {
    setCardList(dataTemp.data)
    // setCardSelected(ffeTokenRedux)
    setLoading(false)
  })

  const onCreate = () => {
    // Router.pushRoute('/playGame')
  }
  const viewYourCart = () => {
    Router.pushRoute('/my-nfts#2')
  }

  const addToCart = async (item) => {
    let itemExistIndex = ffeTokenRedux.findIndex(e => e._id === item._id)
    setLoading(true)
    if (itemExistIndex !== -1) {
      ffeTokenRedux[itemExistIndex].number++
      /* Setting the state of cardSelected to the value of ffeTokenRedux. */
      // setCardSelected(ffeTokenRedux)
      ReduxService.addFFETokenData(ffeTokenRedux)
    } else {
      let tempData = [...ffeTokenRedux, item]
      await ReduxService.addFFETokenData(tempData)
      setLoading(false)
    }
    showNotification('Add card successfully', '', 'open', <CheckCircleOutlined style={{ color: '#27AE60' }} />)
  }

  return (
    <Container className='token-store-container'>
      <div className='wrapper'>
        {
          loading
            ? <div className='text text-center'> <Loading />  </div>
            : <div className='wrapper'>
              <Row className='token-store-title'>
                <Col xs={24} md={18} sm={18}>
                  <p className='text text-title text-bold text-title-mobile MT40'>{'Forbidden Fruit Energy Token'}</p>
                  <p className='text text-color-4 MT15'>{'Every Forbidden Fruit Energy Token card represents a number of Points. You can transfer it to another address, or convey it into our company’s points and use them to pay for our services.'}</p>
                </Col>
              </Row>
              <Row className='token-store-title MB5'>
                <Col xs={21} md={21} sm={18} />
                <a href='#' className='view-your-cart' onClick={viewYourCart}>
                  <span className='MR10 text text-color-main text-bold text-size-3x'>{'Cart'}</span><img src={images.icCart} className='icon-cart' />
                  {ffeTokenRedux.length > 0 && <span className='cart-number'>{ffeTokenRedux.length}</span>}
                </a>
              </Row>
              <Row className='flex'>
                {cardList.length > 0
                  ? (
                    <List
                      className='token-cards'
                      dataSource={cardList}
                      grid={{ gutter: 20, xs: 2, sm: 2, md: 3 }}
                      renderItem={item => (
                        <List.Item>
                          <div className='token-card-item'>
                            <div className='token-card-img'>
                              <img src={item.card_img} onClick={() => addToCart(item)} />
                            </div>
                            <div className='token-card-amount MB15'>
                              <span>{numberWithCommas(item.amount)}円</span>
                            </div>
                            <Button block onClick={() => addToCart(item)}>{'Add to Cart'}</Button>
                          </div>
                        </List.Item>
                      )}
                    />
                  ) : <div className='text text-center'>{'No information'}</div>}
              </Row>
            </div>
        }
      </div>
    </Container>
  )
}

export default GameScreen
