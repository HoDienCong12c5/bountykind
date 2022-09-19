import React, { useEffect, useState } from 'react'
import { Spin } from 'antd'
import './style.scss'
import { LoadingOutlined } from '@ant-design/icons'
import { Router } from 'common/routes'
import Filters from 'pages/Components/Marketplace/Filters'
import { images } from 'config/images'
import Nft from 'pages/Components/Marketplace/Nft'
import MultipleFilter from 'pages/Components/Marketplace/Filter/Multiple'
import MySelect from 'pages/Components/MySelect'
import {
  MainContainer,
  TypeSelector,
  NftsContainer,
  TopFilter,
  Amount,
  RightFilter,
  FilterOption,
  RightContainer,
  MobileFiltersContainer,
  ToggleFilter,
  Container,
  NumberFilter
} from './style'
import { MediaStyle } from 'pages/Style/CommonStyle'
import { useFilters } from 'hooks/useFilters'
import Empty from 'pages/Components/Marketplace/Empty'

import { useGetSpheres } from 'hooks/useGetSpheres'
import { useGetNftFilters } from 'hooks/useGetNftFilters'
import FilterBottom from 'pages/Components/Marketplace/FilterBottom'
import FilterRange from 'pages/Components/Marketplace/FilterRange'
import Loading from 'pages/Components/Loading'
const NftStore = () => {
  const {
    marketFiltersData,
    isLoadingGetMarketFilters,
    getMarketFiltersError
  } = useGetNftFilters()
  const [nftsWithPrice, setNftsWithPrice] = useState([])
  const {
    currentQueryString,
    queries,
    numberQuery,
    updateQuery,
    resetFilter,
    resetAllFilters
  } = useFilters()
  const { spheres, isLoadingGetSpheres, getSpheresError } =
    useGetSpheres(currentQueryString)
  const [openFilterMobile, setOpenFilterMobile] = useState(false)
  const [tableMode, setTableMode] = useState(1)
  const [filters, setFilters] = useState(null)

  const handleSortFilterChange = (value) => {
    updateQuery('sortBy', value)
  }

  useEffect(() => {
    if (currentQueryString) {
      Router.pushRoute(`/store/${currentQueryString}`)
    }
  }, [currentQueryString])

  const handleChangePage = (page) => {
    updateQuery('page', parseInt(page))
  }

  useEffect(() => {
    if (marketFiltersData) {
      const filtersData = marketFiltersData.sapphire
      let _filters = []
      for (let property in filtersData) {
        const filter = {
          headerName: property.replace(
            property.charAt(0),
            property.charAt(0).toUpperCase()
          ),
          keys: filtersData[property],
          propertyName: `${property}`
        }
        _filters.push(filter)
      }
      setFilters(_filters)
    }
  }, [marketFiltersData])

  const renderFilter = (filter, type = 'button') => {
    const { headerName, keys, propertyName } = filter
    return (

      type === 'button' ? (
        <FilterBottom
          key={propertyName}
          headerName={headerName}
          keys={keys}
          selectedKeys={queries.get(propertyName)}
          propertyName={propertyName}
          onKeysChange={updateQuery}
          resetFilter={resetFilter}
        />
      ) : (
        <FilterRange
          key={propertyName}
          filterType={type}
          headerName={headerName}
          keys={keys}
          selectedKeys={queries.get(propertyName)}
          propertyName={propertyName}
          onKeysChange={updateQuery}
          resetFilter={resetFilter}
        />
      )

    )
  }

  const renderFilters = (width) => {
    const tempData = {
      headerName: 'Type',
      keys: [
        {
          title: 'HP',
          icon: images.iconTypeGame.iconHP,
          minRange: 10,
          maxRange: 100
        }
      ],
      propertyName: 'type'
    }
    return (
      <Filters
        width={width}
        resetAllFilters={() => resetAllFilters()}
        numberFilter={numberQuery}
      >
        {filters?.length > 0 && filters.map((filter) => renderFilter(filter))}
        {/* {renderFilter(tempData, 'range')} */}
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
                {numberQuery > 0 ? numberQuery : ''}
              </NumberFilter>
            )}
          </button>
        </ToggleFilter>
        {openFilterMobile && renderFilters('100%')}
      </MobileFiltersContainer>
    )
  }

  return (
    <Container>
      <MainContainer>
        <TypeSelector />
        <MediaStyle rD={() => renderFilters('20%')} rM={renderFiltersMobile} />
        <RightContainer>
          <TopFilter>
            <Amount>{spheres?.length} ITEMS</Amount>
            <RightFilter>
              <MySelect
                onChange={handleSortFilterChange}
                suffixIcon={<img src={images.icArrowBold} />}
                dropdownClassName='filter-select-dropdown'
                defaultValue={'latest'}
                value={
                  queries.get('sortBy') ? queries.get('sortBy')[0] : 'latest'
                }
              >
                <FilterOption value='latest'>Latest</FilterOption>
                <FilterOption value='lowestPrice'>Lowest Price</FilterOption>
                <FilterOption value='highestPrice'>Highest Price</FilterOption>
              </MySelect>
              {/* <TableModeToggle>
                <ModeOption
                  onClick={() => {
                    setTableMode(1)
                  }}
                  className={tableMode === 1 ? 'selected' : ''}
                >
                  <img src={images.icTableMode1} />
                </ModeOption>
                <ModeOption
                  onClick={() => {
                    setTableMode(2)
                  }}
                  className={tableMode === 2 ? 'selected' : ''}
                >
                  <img src={images.icTableMode2} />
                </ModeOption>
              </TableModeToggle> */}
            </RightFilter>
          </TopFilter>
          {isLoadingGetSpheres && <Loading styles={{ width: '100%' }} fitContainer withWrapper={false} />}

          <NftsContainer className={tableMode === 1 ? 'mode1' : 'mode2'}>
            {spheres?.length > 0 &&
              !isLoadingGetSpheres &&
              spheres.map(
                (nft, i) =>
                  nft.active === true && (
                    <Nft
                      isStore
                      showSellingStatus={false}
                      showId={false}
                      tableMode={tableMode}
                      handleOnClick={() => {
                        Router.pushRoute(`/store/nft/${nft._id}`)
                      }}
                      nft={nft}
                      key={i}
                    />
                  )
              )}
            {!isLoadingGetSpheres && spheres?.length === 0 && (
              <Empty emptyText='No item found' />
            )}
          </NftsContainer>
        </RightContainer>
      </MainContainer>
    </Container>

  )
}

export default NftStore
