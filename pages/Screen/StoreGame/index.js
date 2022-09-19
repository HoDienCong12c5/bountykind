import { Avatar, Col, Row, Select, Typography } from 'antd'
import { images } from 'config/images'
import { MediaStyle } from 'pages/Style/CommonStyle'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Banner,
  BannerButton,
  BannerDes,
  BannerDesMobile,
  BannerMobile,
  BannerTitle,
  BannerTitleMobile,
  Container
} from '../MarketScreen/style'
import { arrItemInStore, arrListStore, arrSelectStore } from './mock.data'
import { CardItem, ContainerItemList,
  FilterContainer,
  InputSearch,
  LeftContent,
  List,
  ListItem,
  ListItemContent,
  ListItemHeader,
  MainContainer,
  PriceContainer,
  RightContent,
  SelectFilter,
  TitleItemList,
  TitleStoreGame,
  ValueItemList } from './styled'

const { Option } = Select

const StoreGame = (props) => {
  const { messages } = useSelector((state) => state.locale)
  const [selectType, setSelectType] = useState('new')
  const [listItem, setListItem] = useState('')

  const filterItem = (type) => {
    let newArr = []
    if (type === 'new') {
      newArr = arrItemInStore
    }
    if (type === 'desc') {
      newArr = arrItemInStore.sort((a, b) =>
        a.price - b.price
      )
    }
    if (type === 'asc') {
      newArr = arrItemInStore.sort((a, b) =>
        b.price - a.price
      )
    }
    setListItem(newArr)
  }

  React.useEffect(() => {
    filterItem(selectType)
  }, [selectType])

  const renderBannerMobile = () => {
    return (
      <BannerMobile src={images.home.bannerBG}>
        <BannerTitleMobile>{messages.market.title}</BannerTitleMobile>
        <BannerDesMobile>{messages.market.des}</BannerDesMobile>
        <BannerButton
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
          }}
        >
          {messages.market.buyNow}
        </BannerButton>
      </BannerMobile>
    )
  }

  const renderBannerDesktop = () => {
    return (
      <Banner src={images.home.bannerBG}>
        <BannerTitle>{messages.market.title}</BannerTitle>
        <BannerDes>{messages.market.des}</BannerDes>
        <BannerButton
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
          }}
        >
          {messages.market.buyNow}
        </BannerButton>
      </Banner>
    )
  }

  return (
    <Container>
      <MediaStyle rM={renderBannerMobile} rD={renderBannerDesktop} />
      <TitleStoreGame>store</TitleStoreGame>
      <MainContainer>
        <RightContent>
          <List>
            <ListItemHeader>
                Categories
            </ListItemHeader>
            {arrListStore.map((item, key) => (
              <ListItem key={key}>
                <ContainerItemList>
                  <Avatar size={32} />
                  <ListItemContent>
                    <TitleItemList>
                      {item.name}
                    </TitleItemList>
                    <ValueItemList>
                      {item.value}
                    </ValueItemList>
                  </ListItemContent>
                </ContainerItemList>
              </ListItem>
            ))}
          </List>
        </RightContent>
        <LeftContent>
          <FilterContainer>
            <InputSearch />
            <SelectFilter
              value={selectType}
              onChange={(e) => setSelectType(e)}
            >
              {arrSelectStore.map((item, key) => (
                <Option key={key} value={item.value}>
                  {item.name}
                </Option>
              ))}
            </SelectFilter>
          </FilterContainer>
          <Row align='middle' gutter={[16, 16]} className='MT30'>
            {listItem.length > 0 && listItem.map((item, key) => (
              <Col key={key} md={6} sm={2}>
                <CardItem>
                  <img src={item.image} />
                  <Typography>{item.name}</Typography>
                  <Typography> + {item.percentProperty} {item.property}</Typography>
                  <PriceContainer>{item.price} USD</PriceContainer>
                </CardItem>
              </Col>
            ))}
          </Row>
        </LeftContent>
      </MainContainer>
    </Container>
  )
}

export default StoreGame
