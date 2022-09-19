import React from 'react'
import {
  TitleStoreGame, UserTabs, Container, ContentRanking, RowRanking
} from './styled'
import { Avatar, Col, Row, Tabs } from 'antd'
import { ARR_DATA } from './mock.data'
import { UploadOutlined } from '@ant-design/icons'
import { viewExternal } from 'common/function'

const { TabPane } = Tabs

const UserRankingScreen = (props) => {
  return (
    <Container>
      {/* <MediaStyle rM={renderBannerMobile} rD={renderBannerDesktop} /> */}
      <TitleStoreGame>Users Ranking</TitleStoreGame>
      <UserTabs defaultActiveKey='1' centered>
        <TabPane tab='Total ranking' key='1'>
          <ContentRanking >
            <Row align='middle' justify='middle'>
              <Col md={2}>
                #
              </Col>
              <Col md={4} />
              <Col md={8}>
                User
              </Col>
              <Col md={4}>
                Level
              </Col>
              <Col md={6}>
                Account Page
              </Col>
            </Row>
            {ARR_DATA.map((item, key) =>
              <RowRanking align='middle' justify='middle' key={key}>
                <Col md={2}>
                  {key + 1}
                </Col>
                <Col md={4} >
                  <Avatar size={60} />
                </Col>
                <Col md={8}>
                  {item.name}
                </Col>
                <Col md={4}>
                  {item.level}
                </Col>
                <Col md={6}>
                  <UploadOutlined onClick={() => viewExternal(item.link)} />
                </Col>
              </RowRanking>)}
          </ContentRanking>
        </TabPane>
        <TabPane tab='Daily ranking' key='2' />
      </UserTabs>
    </Container>
  )
}

export default UserRankingScreen
