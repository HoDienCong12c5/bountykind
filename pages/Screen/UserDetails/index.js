import React, { useEffect, useRef, useState } from 'react'
import { Router } from 'common/routes'
import {
  Container,
  Content,
  LeftContent,
  RightContentContainer,
  InputSearch,
  Line,
  PaginationContainer,
  ToggleFilter,
  MobileFiltersContainer,
  ItemsContainer,
  OptionContainer,
  Option,
  InnerContainer,
  NumberFilter
} from './style'
import './style.scss'
import Filters from 'pages/Components/Marketplace/Filters'
import Header from './Components/Header'
import MultipleFilters from 'pages/Components/Marketplace/FilterBottom'
import { useFilters } from 'hooks/useFilters'
import { MediaStyle } from 'pages/Style/CommonStyle'
import { useSelector } from 'react-redux'
import { useGetNftFilters } from 'hooks/useGetNftFilters'
import GameService from 'services/gameService'
import { useQuery } from 'react-query'
import { useGetUserItems } from 'hooks/useGetUserItems'
import Nft from 'pages/Components/Marketplace/Nft'
import Empty from 'pages/Components/Marketplace/Empty'
import { useGetUserNFTs } from 'hooks/useGetUserNfts'
import Loading from 'pages/Components/Loading'
import MyPagination from 'pages/Components/MyPagination'

const pageSize = 5
const getListCharacters = async ({ queryKey }) => {
  const owner = queryKey[1]
  let queryString = queryKey[2]
  if (queryString.trim() === '') {
    queryString = '?limit=10'
  } else {
    queryString += '&limit=10'
  }
  queryString = queryString.replaceAll('attributes.character.', '')
  const characterOfGames = await GameService.getGameCharactersUser(
    owner,
    queryString
  )
  if (characterOfGames) {
    return {
      list: characterOfGames.data.data,
      total: characterOfGames.data.total ?? 1
    }
  } else {
    return {
      list: [],
      total: 0
    }
  }
}
const getListScholarship = async ({ queryKey }) => {
  const owner = queryKey[1]
  const pageSelected = queryKey[2]
  const nftScholarships = await GameService.getNftScholarships(
    owner || '0x',
    pageSize ?? 5,
    pageSelected ?? 1
  )
  if (nftScholarships) {
    return {
      list: nftScholarships?.data,
      total: nftScholarships?.totalPage ?? 1
    }
  }
  return [
    {
      list: [],
      total: 0
    }
  ]
}
const MyNFTScreen = (props) => {
  const userData = useSelector((state) => state.userData)

  const [openFilterMobile, setOpenFilterMobile] = useState(false)
  const [viewOption, setViewOption] = useState()
  const [filterTemp, setFilterTemp] = useState([])
  const [types, setTypes] = useState(null)
  // use quey
  const { marketFiltersData } = useGetNftFilters()

  const {
    queries,
    updateQuery,
    resetFilter,
    currentQueryString,
    resetAllFilters
  } = useFilters()
  const [userAddress, setUserAddress] = useState(null)
  const { userNftsData, isLoadingGetUserNfts } = useGetUserNFTs(
    currentQueryString,
    viewOption,
    userAddress
  )
  const { userItemsData, isLoadingUserItems } = useGetUserItems(
    currentQueryString,
    viewOption,
    userAddress
  )

  const { data: listCharOfGames, isLoading: loadingCharacters } = useQuery(
    ['charOfGames', userAddress, currentQueryString],
    getListCharacters,
    {
      enabled: viewOption === 'character' && !!userAddress
    }
  )

  useEffect(() => {
    setUserAddress(props.address)
  }, [])

  useEffect(() => {
    if (!userData) Router.pushRoute('/')
  }, [userData])

  useEffect(() => {
    if (marketFiltersData) {
      let orderedTypes = []
      let _types = [...marketFiltersData.type]
      if (_types.findIndex((type) => type === 'character') !== -1) {
        const foundIndex = _types.findIndex((type) => type === 'character')
        orderedTypes.push(_types[foundIndex])
        _types.splice(foundIndex, 1)
      }
      if (_types.findIndex((type) => type === 'item') !== -1) {
        const foundIndex = _types.findIndex((type) => type === 'item')
        orderedTypes.push(_types[foundIndex])
        _types.splice(foundIndex, 1)
      }
      orderedTypes = [...orderedTypes, ..._types]
      setTypes(orderedTypes)
      if (window.localStorage.getItem('view_option_user')) {
        setViewOption(window.localStorage.getItem('view_option_user'))
        setFilterTemp(
          convertObjectForFilter(
            marketFiltersData[window.localStorage.getItem('view_option_user')]
          )
        )
      } else {
        setViewOption(orderedTypes[0])
        window.localStorage.setItem('view_option_user', orderedTypes[0])
      }
    }
  }, [marketFiltersData])

  useEffect(() => {
    if (viewOption) {
      setFilterTemp(convertObjectForFilter(marketFiltersData[viewOption]))
    }
  }, [viewOption])

  // fnction
  const changeView = (key) => {
    console.log({ key })
    if (key === 'sphere') {
      key = 'sapphire'
    }
    resetAllFilters()
    setViewOption(key)
    window.localStorage.setItem('view_option', key)
  }

  const handleChangePage = async (page) => {
    updateQuery('page', parseInt(page))
  }

  const convertObjectForFilter = (data) => {
    let arr = []
    for (let propertyName in data) {
      arr.push({
        propertyName: `attributes.${viewOption}.${propertyName}`,
        headerName: propertyName,
        keys: data[propertyName]
      })
    }
    return arr
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
            {filterTemp?.length > 0 &&
              filterTemp.map((item) => {
                return (
                  <MultipleFilters
                    key={item.propertyName}
                    propertyName={item.propertyName}
                    headerName={item.headerName}
                    keys={item.keys}
                    selectedKeys={queries.get(item.propertyName)}
                    onKeysChange={updateQuery}
                    resetFilter={resetFilter}
                  />
                )
              })}
          </Filters>
        )}
      </MobileFiltersContainer>
    )
  }

  const renderFiltersDesktop = () => {
    return (
      <Filters
        resetAllFilters={() => {
          resetAllFilters()
        }}
      >
        {filterTemp?.length > 0 &&
          filterTemp.map((item, index) => {
            return (
              <MultipleFilters

                key={item.propertyName}
                propertyName={item.propertyName}
                headerName={item.headerName}
                keys={item.keys}
                selectedKeys={queries.get(item.propertyName)}
                onKeysChange={updateQuery}
                resetFilter={resetFilter}
              />
            )
          })}
      </Filters>
    )
  }
  const leftMenu = () => {
    return (
      <LeftContent>
        {/* <div style={{ textAlign: 'center' }}>
          <InputSearch />
        </div> */}
        <MediaStyle
          rD={() => renderFiltersDesktop()}
          rM={renderFiltersMobile}
        />
      </LeftContent>
    )
  }

  const optionView = () => {
    const arrView = []
    if (types?.length > 0) {
      types.map((item, index) => {
        arrView.push({
          title: item === 'sapphire' ? 'sphere' : item,
          index: index,
          key: item
        })
      })
    }

    return (
      arrView.length > 0 && (
        <OptionContainer>
          {arrView.map((item, index) => (
            <Option
              key={index}
              className={viewOption === item.key && 'selected'}
              onClick={() => changeView(item.title)}
            >
              {item.title}
            </Option>
          ))}
        </OptionContainer>
      )
    )
  }
  const rightContent = () => {
    console.log({ userNftsData })
    const isLoading =
      loadingCharacters || isLoadingGetUserNfts || isLoadingUserItems
    return (
      <RightContentContainer>
        {optionView()}
        <div>
          {listCharOfGames?.list?.length === 0 &&
            !loadingCharacters &&
            viewOption === 'character' && (
              <Empty emptyText='No character found' />
            )}
          {userNftsData?.nfts?.data?.length === 0 &&
            !isLoadingGetUserNfts &&
            viewOption === 'sapphire' && (
              <Empty emptyText='No sapphire found' />
            )}
          {userItemsData?.userItems?.length === 0 &&
            !isLoadingUserItems &&
            viewOption === 'item' && <Empty emptyText='No item found' />}
          {isLoading ? (
            <Loading fitContainer withWrapper={false} />
          ) : (
            <ItemsContainer>
              {userNftsData?.nfts?.data?.length > 0 &&
                  viewOption === 'sapphire' &&
                  !isLoadingGetUserNfts &&
                  userNftsData.nfts.data.map((nft) => (
                    <Nft
                      showSellingStatus={false}
                      showPrice={false}
                      key={nft._id}
                      nft={nft}
                    />
                  ))}

              {listCharOfGames?.list?.length > 0 &&
                  !loadingCharacters &&
                  viewOption === 'character' &&
                  listCharOfGames.list.map((nft) => (
                    <Nft
                      showSellingStatus={false}
                      showPrice={false}
                      key={nft._id}
                      nft={nft}
                    />
                  ))}

              {userItemsData?.userItems?.length > 0 &&
                  !isLoadingUserItems &&
                  viewOption === 'item' &&
                  userItemsData.userItems.map((nft) => (
                    <Nft
                      showSellingStatus={false}
                      showPrice={false}
                      key={nft._id}
                      nft={nft}
                    />
                  ))}

            </ItemsContainer>)}
        </div>

        <PaginationContainer>
          {viewOption === 'item' &&
            !isLoadingUserItems &&
            userItemsData?.userItems?.length > 0 && (
            <MyPagination
              handleChangePage={handleChangePage}
              queries={queries}
              total={userItemsData?.total}
            />
          )}
          {viewOption === 'character' &&
            !loadingCharacters &&
            listCharOfGames?.list?.length > 0 && (
            <MyPagination
              handleChangePage={handleChangePage}
              queries={queries}
              total={listCharOfGames?.total}
            />
          )}
          {viewOption === 'sapphire' &&
            !isLoadingGetUserNfts &&
            userNftsData?.nfts?.length > 0 && (
            <MyPagination
              handleChangePage={handleChangePage}
              queries={queries}
              total={userNftsData?.nfts?.total}
            />
          )}
        </PaginationContainer>
      </RightContentContainer>
    )
  }

  return (
    <Container>
      <InnerContainer>
        <Header addressPlayer={userAddress} />
        <Content>
          {leftMenu()}
          {rightContent()}
        </Content>
      </InnerContainer>
    </Container>
  )
}
MyNFTScreen.getInitialProps = async ({ query }) => {
  const { address } = query
  return { address }
}
export default MyNFTScreen
