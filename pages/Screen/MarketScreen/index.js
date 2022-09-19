import React, { useEffect, useState } from 'react'
import { images } from 'config/images'
import InfiniteScroll from 'react-infinite-scroller'
import { List, Empty } from 'antd'
import {
  Container,
  Banner,
  BannerMobile,
  BannerTitle,
  BannerTitleMobile,
  BannerDes,
  BannerDesMobile,
  BannerButton,
  NFTContainer,
  NFTContainerMobile,
  NFTFilters,
  ResultCount,
  SearchBar,
  SearchInput,
  FilterSelectContainer,
  FilterSelectContainerMobile,
  FilterSelect,
  FilterOption,
  ResultCountMobile,
  SearchBarMobile,
  NFTs,
  FilterName
} from './style'
import NFTItemMarket from 'pages/Components/NFTItemMarket'
import { useSelector } from 'react-redux'
import './style.scss'
import axios from 'axios'
import useSellingNFTs from 'hooks/useSellingNFTs'
import styled from 'styled-components'
import { scrollTop } from 'common/function'
import router, { useRouter } from 'next/router'
import { MediaStyle, MG } from 'pages/Style/CommonStyle'
import Loading from 'pages/Components/Loading'
import { Router } from 'common/routes'

export const EmptyContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`

const MarketScreen = () => {
  const perPage = 18
  const [isInit, setIsInit] = useState(true)
  const route = useRouter()
  const [types, setTypes] = useState([])
  const [searchKey, setSearchKey] = useState('')
  const { messages } = useSelector(state => state.locale)
  const { showMarket } = useSelector(state => state.settingRedux.others)

  const sortOptions = [
    { key: 1, title: messages.nft.new },
    { key: 2, title: messages.nft.popular },
    { key: 3, title: messages.nft.high },
    { key: 4, title: messages.nft.low }
  ]
  const [filterData, setFilterData] = useState(null)
  const { nfts, currentPage, loading, loadingMore, hasMore, totalPages, totalItems } = useSellingNFTs(filterData)
  const [currentFilter1, setCurrentFilter1] = useState(null)
  const [currentFilter2, setCurrentFilter2] = useState(1)
  const getNfts = async () => {
    if (router.query?.type) {
      setCurrentFilter1(Number(router.query?.type))
      setFilterData({
        page: 1,
        limit: perPage,
        type: Number(router.query?.type)
      })
      setIsInit(false)
    } else {
      setCurrentFilter1(-1)
      setFilterData({
        page: 1,
        limit: perPage
      })
    }
  }
  const getTypes = async () => {
    const response = await axios({
      url: 'https://dev-api-nftgame.w3w.app/nft/filters',
      method: 'GET'
    })
    const data = response.data
    setTypes(data.data)
  }

  useEffect(() => {
    scrollTop()
    getNfts()
    getTypes()
  }, [])
  const handleSearch = (e) => {
    setFilterData({
      ...filterData,
      page: 1,
      limit: perPage,
      key: searchKey
    })
    e.preventDefault()
  }
  const handleInfiniteOnLoad = () => {
    if (currentPage < totalPages) {
      setFilterData({
        ...filterData,
        page: currentPage + 1
      })
    }
  }
  useEffect(() => {
    if (!route.query?.type || !isInit) {
      if (currentFilter1 !== -1) {
        setFilterData({
          ...filterData,
          page: 1,
          limit: perPage,
          type: currentFilter1
        })
      } else {
        let newFilter = { ...filterData }
        delete newFilter.type
        setFilterData(newFilter)
      }
    }
  }, [currentFilter1])
  useEffect(() => {
    if (!route.query?.type || !isInit) {
      let direction = ''
      let sort = ''
      switch (currentFilter2) {
      case 1:
        direction = 'desc'
        sort = 'createdAt'
        break
      case 2:
        direction = 'desc'
        sort = 'view'
        break
      case 3:
        direction = 'desc'
        sort = 'jpyPrice'
        break
      case 4:
        direction = 'asc'
        sort = 'jpyPrice'
        break
      }
      setFilterData({
        ...filterData,
        page: 1,
        limit: perPage,
        direction,
        sort
      })
    }
  }, [currentFilter2])
  useEffect(() => {
    if (showMarket === 'false') {
      Router.pushRoute('/')
    }
  }, [])
  const renderDesktop = () => {
    return (
      currentFilter1 !== null &&
      <Container>
        <Banner src={images.home.bannerBG}>
          <BannerTitle>
            {messages.market.title}
          </BannerTitle>
          <BannerDes>
            {messages.market.des}
          </BannerDes>
          <BannerButton onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
          }}>
            {messages.market.buyNow}
          </BannerButton>
        </Banner>
        <NFTContainer>
          <NFTFilters>
            <ResultCount>
              {totalItems} {messages.market.items}
            </ResultCount>
            <SearchBar>
              <form onSubmit={(e) => { handleSearch(e) }}>
                <button type='submit' style={{ opacity: 0.3, cursor: 'pointer' }}>
                  <img src={images.icSearchWhite} />
                </button>
                <SearchInput onChange={(e) => { setSearchKey(e.target.value) }} value={searchKey} placeholder={messages.common.search} />
              </form>
            </SearchBar>
            <FilterSelectContainer>
              <FilterSelect
                getPopupContainer={triggerNode => triggerNode.parentElement}
                onChange={(value) => {
                  setCurrentFilter1(value)
                }}
                suffixIcon={<img src={images.icSelectArrow} />}
                dropdownClassName='filter-select-dropdown'
                defaultValue={currentFilter1}>
                <FilterOption value={-1}>
                  <FilterName>{messages.myNFT.All}</FilterName>
                </FilterOption>
                {types?.length > 0 && types.map(type =>
                  <FilterOption key={type.type} value={type.type}>
                    <FilterName>{type.name}</FilterName>
                  </FilterOption>
                )}
              </FilterSelect>
            </FilterSelectContainer>
            <FilterSelectContainer>
              <FilterSelect
                getPopupContainer={triggerNode => triggerNode.parentElement}
                suffixIcon={<img src={images.icSelectArrow} />}
                dropdownClassName='filter-select-dropdown'
                onChange={(value) => {
                  setCurrentFilter2(value)
                }}
                defaultValue={1}>
                {sortOptions.map(filterOption =>
                  <FilterOption key={filterOption.key} value={filterOption.key}>
                    <FilterName>{filterOption.title}</FilterName>
                  </FilterOption>
                )}
              </FilterSelect>
            </FilterSelectContainer>
          </NFTFilters>
          <NFTs>
            {nfts?.length > 0 && !loading &&
            <InfiniteScroll
              initialLoad={false}
              pageStart={0}
              loadMore={handleInfiniteOnLoad}
              hasMore={!loading && !loadingMore && hasMore}
            >
              <List
                grid={{
                  gutter: 25,
                  xxl: 6,
                  xl: 6,
                  lg: 4,
                  md: 4,
                  sm: 2,
                  xs: 2
                }}
                dataSource={nfts}
                className='nft-market-container MT10'
                renderItem={(item) => (
                  <List.Item>
                    <NFTItemMarket item={item} />
                    <MG MB={30} />
                  </List.Item>
                )}
              >
                {nfts?.length === 0 && !loading && null}
              </List>
            </InfiniteScroll>}
            {loadingMore && (
              <Loading fitContainer withWrapper={false} />
            )}
            {nfts?.length === 0 && !loading &&
            <EmptyContainer>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </EmptyContainer>}
            {loading &&
            <Loading fitContainer withWrapper={false} /> }
          </NFTs>
        </NFTContainer>
      </Container>
    )
  }
  const renderMobile = () => {
    return (
      currentFilter1 !== null &&
      <Container>
        <BannerMobile src={images.home.bannerBG}>
          <BannerTitleMobile>
            {messages.market.title}
          </BannerTitleMobile>
          <BannerDesMobile>
            {messages.market.des}
          </BannerDesMobile>
          <BannerButton onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
          }}>
            {messages.market.buyNow}
          </BannerButton>
        </BannerMobile>
        <NFTContainerMobile>
          <NFTFilters>
            <ResultCountMobile>
              {totalItems} {messages.market.items}
            </ResultCountMobile>
            <SearchBarMobile>
              <form onSubmit={(e) => { handleSearch(e) }} style={{ width: '100%' }}>
                <button type='submit' style={{ opacity: 0.3, cursor: 'pointer' }}>
                  <img src={images.icSearchWhite} />
                </button>
                <SearchInput onChange={(e) => { setSearchKey(e.target.value) }} value={searchKey} placeholder={messages.common.search} />
              </form>
            </SearchBarMobile>
            <FilterSelectContainerMobile>
              <FilterSelect
                getPopupContainer={triggerNode => triggerNode.parentElement}
                dropdownClassName='filter-select-dropdown'
                onChange={(value) => {
                  setCurrentFilter1(value)
                }}
                suffixIcon={<img src={images.icSelectArrow} />}
                defaultValue={currentFilter1}>
                <FilterOption value={-1}>
                  <FilterName>{messages.myNFT.All}</FilterName>
                </FilterOption>
                {types?.length > 0 && types.map(type =>
                  <FilterOption key={type.type} value={type.type}>
                    <FilterName>{type.name}</FilterName>
                  </FilterOption>
                )}
              </FilterSelect>
            </FilterSelectContainerMobile>
            <FilterSelectContainerMobile>
              <FilterSelect
                getPopupContainer={triggerNode => triggerNode.parentElement}
                dropdownClassName='filter-select-dropdown'
                onChange={(value) => {
                  setCurrentFilter2(value)
                }}
                suffixIcon={<img src={images.icSelectArrow} />}
                defaultValue={currentFilter2}>
                {sortOptions.map(filterOption =>
                  <FilterOption key={filterOption.key} value={filterOption.key}>
                    <FilterName>{filterOption.title}</FilterName>
                  </FilterOption>
                )}
              </FilterSelect>
            </FilterSelectContainerMobile>
          </NFTFilters>
          <NFTs>
            {nfts?.length > 0 && !loading &&
            <InfiniteScroll
              initialLoad={false}
              pageStart={0}
              loadMore={handleInfiniteOnLoad}
              hasMore={!loading && !loadingMore && hasMore}
            >
              <List
                grid={{
                  gutter: 21,
                  xxl: 6,
                  xl: 6,
                  lg: 4,
                  md: 2,
                  sm: 2,
                  xs: 2
                }}
                dataSource={nfts}
                className='nft-market-container'
                renderItem={(item) => (
                  <List.Item>
                    <NFTItemMarket item={item} />
                  </List.Item>
                )}
              >
                {loadingMore && (
                  <Loading fitContainer withWrapper={false} />
                )}
                {nfts?.length === 0 && !loading && null}
              </List>
            </InfiniteScroll>}
            {nfts?.length === 0 && !loading &&
            <EmptyContainer>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </EmptyContainer>}
            {loading &&
            <Loading fitContainer withWrapper={false} />
            }
          </NFTs>
        </NFTContainerMobile>
      </Container>
    )
  }
  return (
    <MediaStyle rD={renderDesktop} rM={renderMobile} />
  )
}

export default MarketScreen
