import React, { useState } from 'react'
import Tab from 'pages/Components/Tab'
import Media from 'react-media'
import {
  Container,
  MainContainer,
  BackContainer
} from './styled'
import TableDesktop from './Components/TableDesktop'
import { init } from './fakeData'
import TableMobile from './Components/TableMobile'
import InfiniteScroll from 'react-infinite-scroller'
import { images } from 'config/images'
import { Router } from 'common/routes'
const pageSize = 10
const RankingUserScreen = () => {
  const [pageAi, setPageApi] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [loadMore, setLoadMore] = useState(false)
  const renderTabView = () => {
    const menu = [
      {
        title: 'Total Ranking'
      },
      {
        title: 'Daily Ranking'
      }
    ]
    return (
      <Tab item={menu} onClick={onChangeTabView} />
    )
  }
  const tableDesktop = () => {
    return (
      <>
        <TableDesktop
          data={init}
          loadMore={loadMore}
          pageSize={pageSize}
        />
      </>

    )
  }
  const tableMobile = () => {
    return (
      <div style={{
        maxHeight: 800,
        overflowY: 'scroll'
      }}>
        <InfiniteScroll
          initialLoad={false}
          useWindow={false}
          pageStart={0}
          loadMore={() => onLoadMoreData(true)}
        >
          <TableMobile data={init} />

        </InfiniteScroll>
      </div>

    )
  }

  const onChangeTabView = (index) => {
    if (index === 0) {
      console.log('index 0')
    }
  }
  const onLoadMoreData = (pageSelected, pageSize) => {
  }
  return (
    <Container >
      <MainContainer >
        <BackContainer>
          <button onClick={() => { Router.back() }}><img src={images.icBack} />Back</button>
        </BackContainer>
        {renderTabView()}
        <Media query='(min-width: 768px)'>
          {(match) => {
            if (match) {
              return tableDesktop()
            }
            return tableMobile()
          }}
        </Media>
      </MainContainer>

    </Container>

  )
}
export default RankingUserScreen
