import { Button, Col, Row } from 'antd'
import { images } from 'config/images'
import { Router } from 'common/routes'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const ArrayFee = [10, 18, 45, 50]
const ArrayTimes = [5, 10, 20, 30]
const BoardGameContainerStyled = styled.div``
const BannerBoardGamestyled = styled.img`
  position: absolute;
`
const BoardGameContentStyled = styled.div`
  padding-top: 50px;
  position: relative;
  display: flex;
  width: 100%;
  max-width: 1350px;
  margin: 0px auto;
`
const LeftContent = styled.div`
  background-color: #f6f6f6;
  max-width: 450px;
  position: relative;
`
const RightContent = styled.div`
  margin-left: 50px;
  img{
    max-width: 800px;
  }
`

const CloseIcon = styled.img`
  position: absolute;
  right: 10px;
  top: 10px;
`
const HeaderTitle = styled.div`
  text-transform: uppercase;
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 2px;
  color: #000000;
  text-align: center;
`
const HeaderSubTitle = styled.div`
  margin-top: 10px;
  font-size: 1rem;
  letter-spacing: 2px;
  color: gray;
  text-align: center;
`

const Text = styled.p`
  margin-top: 30px;
  font-weight: bold;
  color: lightblue;
`
const MainContent = styled.div`
  margin-top: 20px;
  padding: 50px;
`
const ListItem = styled.ul`
  .active {
    color: #1877F2;
  }
`
const Item = styled.li`
  font-size: 0.875rem;
  font-weight: 500;
  color: gray;
  margin-top: 0.5rem;
  label {
    margin-left: 5px;
  }
`
const ButtonBuy = styled.div`
  text-align: center;
  button {
    min-width: 250px !important;
    border: none !important;
    border-radius: 10px;
    color: white;
    background-color: lightblue;
  }
`

const BoardGame = () => {
  const { messages } = useSelector((state) => state.locale)
  const [activeKey, setActiveKey] = React.useState()
  return (
    <BoardGameContainerStyled>
      <BannerBoardGamestyled src={images.home.bannerBG} />
      <BoardGameContentStyled>
        <LeftContent>
          <CloseIcon src={images.icClose} width={15} />
          <MainContent>
            <HeaderTitle>Buy Dice Package</HeaderTitle>
            <HeaderSubTitle>
              Please choose one of the package below
            </HeaderSubTitle>
            <Row align='middle' className='MT30'>
              <Col span={9}>
                <ListItem>
                  {ArrayFee.map((item, key) => (
                    <Item key={key} className={activeKey === key && 'active'}>
                      <input
                        type='radio'
                        id='html'
                        name='fav_language'
                        value={item}
                        onChange={(key) => console.log(key)}
                      />
                      <label htmlFor='age1'>{item} FEE</label>
                    </Item>
                  ))}
                </ListItem>
              </Col>
              <Col span={15}>
                <ListItem>
                  {ArrayTimes.map((item, key) => (
                    <Item key={key} className={activeKey === key && 'active'}>
                      {item} times
                    </Item>
                  ))}
                </ListItem>
              </Col>
            </Row>
            <Text>Refill FEE</Text>
            <ButtonBuy>
              <Button className='MT30'>Buy Now</Button>
            </ButtonBuy>
          </MainContent>
        </LeftContent>
        <RightContent>
          <img src={images.backgroundGame} />
          <ButtonBuy>
            <Button onClick={() => {
              Router.pushRoute('/playGame');
            }}className='MT30 text text-uppercase'>Play</Button>
          </ButtonBuy>
        </RightContent>
      </BoardGameContentStyled>
    </BoardGameContainerStyled>
  )
}

export default BoardGame
