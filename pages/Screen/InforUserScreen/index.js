import React, { useEffect, useRef, useState } from 'react'
import { Router } from 'common/routes'
import {
  Container,
  Content,
  LeftContent,
  RightContent,
  InputSearch,
  NFTDetails,
  AvatarNFT,
  TypeToken,
  NameToken,
  Level,
  PaginationContainer,
  MyPagination,
  MobileFiltersContainer,
  ToggleFilter,
  NumberFilter

} from './style'
import { Row, Col, Tabs } from 'antd'
import Filters from 'pages/Components/Marketplace/Filters'
import Header from './Components/Header'
import MultipleFilters from 'pages/Components/Marketplace/Filter/Multiple'
import { useFilters } from 'hooks/useFilters'
import MyModal from 'pages/Components/MyModal'
import Tab from 'pages/Components/Tab'
import axios from 'axios'
import { MediaStyle } from 'pages/Style/CommonStyle'

import MarketService from 'services/marketService'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'

const urlImgFake = 'https://static.remove.bg/remove-bg-web/588fbfdd2324490a4329d4ad22d1bd436e1d384a/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png'
const tokenFake = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjY4YzdmOGVkMTFiOTBhZTAxMDQxODEiLCJhZGRyZXNzIjoiMHgwMTk4NTU1NTc0NzBlNWIwN2Q2ZmNiMWMwN2Y0ZjJiOGE0YWIwNmYzIiwidXNlcm5hbWUiOiIweDAxOTg1NTU1NzQ3MGU1YjA3ZDZmY2IxYzA3ZjRmMmI4YTRhYjA2ZjMiLCJpYXQiOjE2NTIzNDg5MDYsImV4cCI6MTk2NzkyNDkwNn0.d6g9UlUlGjl6-zou__lwxQsabJC2KNrW47NmMdyS7NQ'
const addFake = '0x8240651515872eb0c964942c8a019d48a0d8b8e7'

const getAllFilters = async () => {
  const response = await MarketService.getAllMarketFilters()
  const { character } = response.data
  return character
}
const defaultPageSize = 5
const InforUserScreen = () => {
  const { queries, updateQuery, resetFilter, currentQueryString, resetAllFilters } = useFilters()
  const userData = useSelector(state => state.userData)
  const [openFilterMobile, setOpenFilterMobile] = useState(false)
  const [dataNFT, setdataNFT] = useState([])
  const [pageApi, setpageApi] = useState(1)
  const [pageShow, setpageShow] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const { data: characterFilters, isLoading: isLoadingFilters, isError } = useQuery('character-filters', getAllFilters)

  useEffect(() => {
    if (currentQueryString) {
      Router.pushRoute(`/infor-user/${currentQueryString}`)
    }
  }, [currentQueryString])

  const leftMenu = () => {
    return (
      <LeftContent>
        <div style={{ textAlign: 'center' }}>
          <InputSearch />

        </div>
        <MediaStyle
          rD={() => renderFiltersDesktop()}
          rM={renderFiltersMobile}
        />
      </LeftContent>
    )
  }
  const renderFiltersDesktop = () => {
    return (
      <Filters resetAllFilters={() => { resetAllFilters() }}>
        {characterFilters?.race?.length > 0 &&
        <MultipleFilters
          propertyName={'race'}
          headerName={'Race'}
          keys={characterFilters.race}
          nameField={'name'}
          valueField={'slug'}
          selectedKeys={queries.get('race')}
          onKeysChange={updateQuery}
          resetFilter={resetFilter}
        />}
      </Filters>
    )
  }
  const renderFiltersMobile = () => {
    return (
      <MobileFiltersContainer
        className={openFilterMobile ? 'active' : 'inactive'}
      >
        <ToggleFilter>
          <button
            onClick={() => {
              setOpenFilterMobile(!openFilterMobile)
            }}
          >
            Filter
            {!openFilterMobile && (
              <NumberFilter>
                {/* {numberQuery - 1 > 0 ? numberQuery - 1 : ''} */}
              </NumberFilter>
            )}
          </button>
        </ToggleFilter>
        {openFilterMobile && (
          <Filters
            resetAllFilters={() => {
              resetAllFilters()
            }}
          >
            {characterFilters?.race?.length > 0 && (
              <MultipleFilters
                propertyName={'race'}
                headerName={'Race'}
                keys={characterFilters.race}
                nameField={'name'}
                valueField={'slug'}
                selectedKeys={queries.get('race')}
                onKeysChange={updateQuery}
                resetFilter={resetFilter}
              />
            )}
          </Filters>
        )}
      </MobileFiltersContainer>
    )
  }
  const itemMyNFT = () => {
    let litVirtual = []
    for (let index = 0; index < 10; index++) {
      litVirtual.push(<div>Item My NFT</div>)
    }
    return (
      litVirtual.map((item, index) => {
        return <NFTDetails key={index} onClick={() => selectedNFT(item)} isCharacter={index % 2 === 0} >
          {index % 2 === 0 && <div style={{ display: 'flex', width: '100%' }}>ID : {index}</div>}
          <AvatarNFT src={urlImgFake} />
          <TypeToken >
            <div >
              <img src={urlImgFake} alt='avatar' style={{ height: 25, width: 25 }} />
            Ultra
            </div>

          </TypeToken>
          <NameToken>
            { 'Ultratime'}
          </NameToken>
          <Level >
            {`Lv ${index}`}
          </Level>
        </NFTDetails>
      })
    )
  }
  const rightContent = () => {
    return (
      <div style={{ paddingLeft: 10, paddingRight: 10 }}>
        <RightContent>
          <div style={{
            width: '100%',
            textAlign: 'center',
            alignItems: 'center',
            margin: 'auto' }}>
            {optionView()}
          </div>
          <Row >
            {itemMyNFT()}
          </Row>
          <PaginationContainer>
            <MyPagination
              size='small'
              defaultCurrent={1}
              current={queries.get('page') ? parseInt(queries.get('page')[0]) : 1}
              onChange={handleChangePage}
              total={totalPage * defaultPageSize}
              pageSize={defaultPageSize}
              simple />
          </PaginationContainer>

        </RightContent>
      </div>
    )
  }
  const optionView = () => {
    const arrView = [
      {
        title: `ASSETS`
      }
    ]
    return (
      <Tab
        className='tab-Portfolios'
        onClick={changeView}
        item={arrView}
      />
    )
  }
  const changeView = (key) => {
  }
  const selectedNFT = (item) => {
    const id = '7981991'
    Router.pushRoute(`/my-nft-detail/${id}`)
  }
  const handleChangePage = async (page) => {
    updateQuery('page', parseInt(page))
    await loadMoreData(page)
  }
  const loadMoreData = async (page) => {
    if (page > pageApi) {
      if (pageApi < totalPage) {
        setpageApi(pageApi + 1)
        setpageShow(pageShow + 1)
        const ownerFake = '0x64470e5f5dd38e497194bbcaf8daa7ca578926f6'
        const res = await axios.get(`https://dev-api-nftgame.w3w.app/nfts/my-nfts?limit=${defaultPageSize}&owner=${ownerFake}&page=${pageApi}`)
        if (await res.data.data.length > 0) {
          res.data.data.forEach(element => {
            dataNFT.push(element)
          })
          setdataNFT([...dataNFT])
        }
      }
    } else {
      if (page < pageShow) {
        setpageShow(pageShow - 1)
      } else {
        setpageShow(pageShow + 1)
      }
    }
  }
  return (
    <Container >
      <Header />
      <Content >
        {leftMenu()}
        {rightContent()}

      </Content>

    </Container>
  )
}
export default InforUserScreen
