import React, { useEffect, useState } from 'react'
import { Spin } from 'antd'
import './style.scss'
import { LoadingOutlined } from '@ant-design/icons'
import { Router } from 'common/routes'
import Filters from 'pages/Components/Marketplace/Filters'
import { images } from 'config/images'
import MultipleFilter from 'pages/Components/Marketplace/Filter/Multiple'
import Nft from 'pages/Components/Marketplace/Nft'
import {
  Container,
  MainContainer,
  TypeSelector,
  NftsContainer,
  Type,
  TopFilter,
  Amount,
  TableModeToggle,
  ModeOption,
  RightFilter,
  FilterSelect,
  FilterOption,
  RightContainer,
  PaginationContainer,
  MobileFiltersContainer,
  ToggleFilter,
  NumberFilter,
} from "./style";
import { MediaStyle } from 'pages/Style/CommonStyle'
import { useFilters } from 'hooks/useFilters'
import Empty from 'pages/Components/Marketplace/Empty'
import { useGetNftFilters } from 'hooks/useGetNftFilters'
import { MARKET_FILTERS_TYPE } from 'common/constants'
import { useGetSellingNFTs } from 'hooks/useGetSellingNFTs'
import FilterBottom from 'pages/Components/Marketplace/FilterBottom'

import  MySelect from 'pages/Components/MySelect'
import Loading from 'pages/Components/Loading'
import { useSelector } from 'react-redux'
import MyPagination from 'pages/Components/MyPagination'
const Marketplace = () => {
  const messages = useSelector(state => state.locale.messages)
  const [nftTypes, setNftTypes] = useState(null)
  const [nftType, setNftType] = useState(null)
  const {
    marketFiltersData,
    isLoadingGetMarketFilters,
    getMarketFiltersError,
  } = useGetNftFilters()
  const {
    currentQueryString,
    queries,
    numberQuery,
    updateQuery,
    updateQueries,
    resetFilter,
    resetAllFilters,
    setNewQuery,
  } = useFilters()
  const {
    getSellingNftsData,
    isLoadingSellingNfts,
    getSellingNFTsError,
  } = useGetSellingNFTs(currentQueryString)
  const [openFilterMobile, setOpenFilterMobile] = useState(false)
  const [filters, setFilters] = useState(null)
  const [isLoadingNfts, setLoadingNfts] = useState(false)
  const [tableMode, setTableMode] = useState(1)

  const handleSortFilterChange = (value) => {
    const queryObj = {
      sort: value,
    }
    updateQueries(queryObj)
  }

  useEffect(() => {
    if (marketFiltersData) setNftTypes(marketFiltersData['type'])
  }, [marketFiltersData])

  useEffect(() => {
    if (nftTypes?.length > 0) {
      if (queries.get('attributes.type')) {
        setNftType(queries.get('attributes.type')[0])
      } else {
        setNftType(nftTypes[0])
      }
    }
  }, [nftTypes, queries])

  useEffect(() => {
    if (nftType) setAllFilters()
  }, [nftType])

  const setAllFilters = () => {
    setFilters(null)
    const filtersData = marketFiltersData[nftType]
    let _filters = []
    for (let property in filtersData) {
      const filter = {
        headerName: property.replace(
          property.charAt(0),
          property.charAt(0)?.toUpperCase(),
        ),
        keys: filtersData[property],
        propertyName: `attributes.${nftType}.${property}`,
      }
      _filters.push(filter)
    }
    setFilters(_filters)
  }

  const renderFilter = (filter) => {
    const { headerName, keys, propertyName } = filter
    return (
      <FilterBottom 
        key={propertyName}
        filterType="button"
        headerName={headerName}
        keys={keys}
        selectedKeys={queries.get(propertyName)}
        propertyName={propertyName}
        onKeysChange={updateQuery}
        resetFilter={resetFilter}
      />
    )
  }

  useEffect(() => {
    if (currentQueryString) {
      Router.pushRoute(`/marketplace/${currentQueryString}`)
    }
  }, [currentQueryString])

  const handleChangePage = (page) => {
    updateQuery('page', parseInt(page))
  }

  const renderFilters = (width) => {
    return (
      <Filters
        width={width}
        numberFilter={numberQuery>0 ? numberQuery-1 :0}
        resetAllFilters={() => resetAllFilters('attributes.type')}
      >
        {filters?.length > 0 && filters.map((filter) => renderFilter(filter))}
      </Filters>
    )
  }

  const renderFiltersMobile = () => {
    return (
      <MobileFiltersContainer
        className={openFilterMobile ? "active" : "inactive"}
      >
        <ToggleFilter>
          <button
            onClick={() => {
              setOpenFilterMobile(!openFilterMobile);
            }}
          >
            Filter
            {!openFilterMobile && (
              <NumberFilter>{(numberQuery - 1>0)?numberQuery - 1:''}</NumberFilter>
            )}
          </button>
        </ToggleFilter>
        {openFilterMobile && renderFilters("100%")}
      </MobileFiltersContainer>
    );
  }

  return (
    <Container>
      <MainContainer>
        <TypeSelector>
          {nftTypes?.length > 0 &&
            nftTypes.map((type) => (
              <Type
                className={nftType === type && 'selected'}
                onClick={() => {
                  setNewQuery('attributes.type', type)
                }}
              >
                {type.replace(type.charAt(0), type.charAt(0)?.toUpperCase())}
              </Type>
            ))}
        </TypeSelector>
        <MediaStyle 
          rD={() => renderFilters('20%')} 
          rM={renderFiltersMobile} 
        />   
        <RightContainer>
         
          <TopFilter>
            {nftType ? (
              <Amount>
                {getSellingNftsData?.totalNfts ?? 0}{' '}
                {nftType.replace(
                  nftType.charAt(0),
                  nftType.charAt(0)?.toUpperCase(),
                )}
                {getSellingNftsData?.totalNfts >1 &&'s' }
              </Amount>
            ) : (
              <Amount />
            )}
            <RightFilter>
              <MySelect
                onChange={handleSortFilterChange}
                suffixIcon={<img src={images.icArrowBold} />}
                dropdownClassName="filter-select-dropdown"
                defaultValue={'latest'}
                value={
                  queries.get('sort')
                    ? queries.get('sort')[0]
                    : 'Latest'
                }
              >
                <FilterOption value="createdAt:desc">{messages.latest}</FilterOption>
                <FilterOption value="price:asc">{messages.lowestPrice}</FilterOption>
                <FilterOption value="price:desc">{messages.hightPrice}</FilterOption>
              </MySelect>
            </RightFilter>
          </TopFilter>


          {isLoadingSellingNfts &&  <Loading styles={{width: '100%'}} fitContainer withWrapper={false}/>}
          <NftsContainer className={tableMode === 1 ? 'mode1' : 'mode2'}>
            {getSellingNftsData?.sellingNfts?.length > 0 &&
              !isLoadingSellingNfts &&
              getSellingNftsData?.sellingNfts.map((nft, i) => (
                <Nft
                isMarketPlace
                  showSellingStatus={false}
                  tableMode={tableMode}
                  handleOnClick={() => {
                    Router.pushRoute(
                      `/marketplace/character/${nft.contractAddress}/${nft.id}`,
                    )
                  }}
                  nft={nft}
                  key={i}
                />
              ))}
          
          </NftsContainer>
          {getSellingNftsData?.sellingNfts?.length > 0 && getSellingNftsData?.totalNfts > 10 &&
            !isLoadingSellingNfts && (
              <PaginationContainer>
              <MyPagination
                handleChangePage={handleChangePage}
                queries={queries}
                total={getSellingNftsData?.totalNfts ?? 0}

              />
              </PaginationContainer>
            )}
          {!isLoadingSellingNfts &&
            getSellingNftsData?.sellingNfts?.length === 0 && (
            <Empty emptyText={`No ${nftType} found`}/>
            )}
        </RightContainer>
      </MainContainer>
    </Container>
  )
}

export default Marketplace
