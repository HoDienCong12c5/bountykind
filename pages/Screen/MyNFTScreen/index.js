import React, { useEffect, useRef, useState } from 'react'
import { Router } from 'common/routes'
import {
  Container,
  Content,
  LeftContent,
  RightContentContainer,
  Line,
  PaginationContainer,
  // MyPagination,
  ToggleFilter,
  MobileFiltersContainer,
  ItemsContainer,
  InnerContainer,
  OptionContainer,
  Option,
  NumberFilter
} from './style'
import './style.scss'
import ReduxService from 'common/redux'
import Filters from 'pages/Components/Marketplace/Filters'
import Header from './Components/Header'
import { useFilters } from 'hooks/useFilters'
import { MediaStyle } from 'pages/Style/CommonStyle'
import { useSelector } from 'react-redux'
import { useGetMyNfts } from 'hooks/useGetMyNfts'
import { useGetNftFilters } from 'hooks/useGetNftFilters'
import GameService from 'services/gameService'
import { useQuery } from 'react-query'
import { useGetUserItems } from 'hooks/useGetUserItems'
import Nft from 'pages/Components/Marketplace/Nft'
import Empty from 'pages/Components/Marketplace/Empty'

import { useRouter } from 'next/router'
import FilterBottom from 'pages/Components/Marketplace/FilterBottom'
import MyPagination from 'pages/Components/MyPagination'
import Loading from 'pages/Components/Loading'
const getListCharacters = async ({ queryKey }) => {
  const owner = queryKey[1].address
  let queryString = queryKey[2]
  if (queryString.trim() === '') {
    queryString = '?limit=10'
  } else {
    queryString += '&limit=10'
  }
  queryString = queryString.replaceAll('attributes.character.', '')
  const regex = /\[.*]&/
  queryString = queryString.replace(regex, '')
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

const MyNFTScreen = () => {
  const router = useRouter()
  const userData = useSelector((state) => state.userData)
  const [openFilterMobile, setOpenFilterMobile] = useState(false)
  const [viewOption, setViewOption] = useState()
  const [filterTemp, setFilterTemp] = useState([])
  const [types, setTypes] = useState(null)
  const { marketFiltersData } = useGetNftFilters()
  const isSigned = ReduxService.checkIsSigned()
  const metamaskRedux = useSelector((state) => state.metamaskRedux)
  const {
    queries,
    numberQuery,
    updateQuery,
    resetFilter,
    currentQueryString,
    resetAllFilters
  } = useFilters()
  const { myNftsData, isLoadingGetMyNfts } = useGetMyNfts(
    currentQueryString,
    viewOption
  )
  const { userItemsData, isLoadingUserItems } = useGetUserItems(
    currentQueryString,
    viewOption,
    userData?.address
  )
  const { data: listCharOfGames, isLoading: loadingCharacters } = useQuery(
    ['charOfGames', userData, currentQueryString],
    getListCharacters,
    {
      enabled: viewOption === 'character' && !!userData
    }
  )

  useEffect(() => {
    if (!userData || !isSigned) Router.pushRoute('/')
  }, [])
  useEffect(() => {
    if (!isSigned) {
      Router.pushRoute('/')
    }
  }, [isSigned, metamaskRedux])

  useEffect(() => {
    if (currentQueryString && isSigned) {
      Router.pushRoute(`/my-nfts/${currentQueryString}`)
    }
  }, [currentQueryString, isSigned])

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
      if (window.localStorage.getItem('view_option')) {
        setViewOption(window.localStorage.getItem('view_option'))
        setFilterTemp(
          convertObjectForFilter(
            marketFiltersData[window.localStorage.getItem('view_option')]
          )
        )
      } else {
        setViewOption(orderedTypes[0])
        window.localStorage.setItem('view_option', orderedTypes[0])
      }
    }
  }, [marketFiltersData])

  useEffect(() => {
    if (viewOption) {
      setFilterTemp(convertObjectForFilter(marketFiltersData[viewOption]))
    }
  }, [viewOption])
  // function

  const handleChangePage = async (page) => {
    updateQuery('page', parseInt(page))
    // window.scrollTo({
    //   top: 0,
    //   left: 0,
    //   behavior: 'smooth'
    // })
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
                {numberQuery > 0 ? numberQuery : ''}
              </NumberFilter>
            )}

          </button>
        </ToggleFilter>
        {openFilterMobile && (
          <Filters
            resetAllFilters={() => {
              resetAllFilters()
            }}
            numberFilter={numberQuery}
          >
            {filterTemp?.length > 0 &&
              filterTemp.map((item) => {
                return (
                  <FilterBottom
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
        numberFilter={numberQuery}
      >
        {filterTemp?.length > 0 &&
          filterTemp.map((item, index) => {
            return (
              <FilterBottom
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
  const changeView = (key) => {
    console.log({ key })
    if (key === 'sphere') {
      key = 'sapphire'
    }
    resetAllFilters()
    setViewOption(key)
    window.localStorage.setItem('view_option', key)
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
    const isLoading =
      loadingCharacters || isLoadingGetMyNfts || isLoadingUserItems
    return (
      <RightContentContainer>
        {optionView()}
        <div style={{ width: '100%' }}>
          {listCharOfGames?.list?.length === 0 &&
            !loadingCharacters &&
            viewOption === 'character' && (
              <Empty emptyText='No character found' />
            )}
          {myNftsData?.nfts?.data?.length === 0 &&
            !isLoadingGetMyNfts &&
            viewOption === 'sapphire' && (
              <Empty emptyText='No sapphire found' />
            )}
          {userItemsData?.userItems?.length === 0 &&
            !isLoadingUserItems &&
            viewOption === 'item' && <Empty emptyText='No item found' />}
          { isLoading ? (
            <div style={{ width: '100%', height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Loading fitContainer withWrapper={false} />
            </div>

          ) : (
            <ItemsContainer>

              {myNftsData?.nfts?.data?.length > 0 &&
              viewOption === 'sapphire' &&
              !isLoadingGetMyNfts &&
              myNftsData.nfts.data.map((nft) => (
                <Nft
                  showPrice={false}
                  handleOnClick={() => {
                    ReduxService.setTransferData({
                      routerBackLink: '/my-nfts',
                      typeItem: 'sapphire'
                    })
                    Router.pushRoute(
                      `/my-nft-detail/${nft.contractAddress}/${nft.nftId}`
                    )
                  }}
                  key={nft._id}
                  nft={nft}
                />
              ))}

              {listCharOfGames?.list?.length > 0 &&
              !loadingCharacters &&
              viewOption === 'character' &&
              listCharOfGames.list.map((nft) =>
                nft?.ownerAddress === userData?.address ||
                nft?.renterAddress === userData?.address ? (
                  <Nft
                      showPrice={false}
                      getDetails
                      handleOnClick={() => {
                        ReduxService.setTransferData({
                          routerBackLink: '/my-nfts',
                          typeItem: 'character'
                        })
                        if (nft.nftId) {
                          Router.pushRoute(
                            `/my-nft-detail/${nft.contractAddress}/${nft.nftId}`
                          )
                        } else {
                          Router.pushRoute(
                            `/my-asset-detail/character/${nft._id}`
                          )
                        }
                      }}
                      key={nft._id}
                      nft={nft}
                    />
                  ) : null
              )}

              {userItemsData?.userItems?.length > 0 &&
                !isLoadingUserItems &&
                viewOption === 'item' &&
                userItemsData.userItems.map((nft) =>
                  nft?.ownerAddress === userData?.address ? (
                    <Nft
                      getDetails
                      showPrice={false}
                      handleOnClick={() => {
                        ReduxService.setTransferData({
                          routerBackLink: '/my-nfts',
                          typeItem: 'item'
                        })
                        if (nft.nftId) {
                          Router.pushRoute(
                            `/my-nft-detail/${nft.contractAddress}/${nft.nftId}`
                          )
                        } else {
                          Router.pushRoute(`/my-asset-detail/item/${nft._id}`)
                        }
                      }}
                      key={nft._id}
                      nft={nft}
                    />
                  ) : null
                )}

            </ItemsContainer>

          )}
        </div>

        <PaginationContainer>
          {viewOption === 'item' &&
            userItemsData?.total > 10 &&
            !isLoadingUserItems &&
            userItemsData?.userItems?.length > 0 && (
            <MyPagination
              handleChangePage={handleChangePage}
              queries={queries}
              total={userItemsData?.total}
            />
          )}
          {viewOption === 'character' &&
            listCharOfGames?.total > 10 &&
            !loadingCharacters &&
            listCharOfGames?.list?.length > 0 && (
            <MyPagination
              handleChangePage={handleChangePage}
              queries={queries}
              total={listCharOfGames?.total}
            />
          )}
          {viewOption === 'sapphire' &&
            myNftsData?.nfts?.total > 10 &&
            !isLoadingGetMyNfts &&
            myNftsData?.nfts?.data?.length > 0 && (
            <MyPagination
              handleChangePage={handleChangePage}
              queries={queries}
              total={myNftsData?.nfts?.total}
            />
          )}
        </PaginationContainer>
      </RightContentContainer>
    )
  }

  return (
    <Container>
      <InnerContainer>
        <Header />

        <Content>
          {leftMenu()}
          {rightContent()}
        </Content>
      </InnerContainer>
    </Container>
  )
}
export default MyNFTScreen
