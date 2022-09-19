import { useState, useEffect, useRef, useCallback } from 'react'
import Observer from 'common/observer'
import { OBSERVER_KEY } from 'common/constants'
import MyNFTService from 'services/myNFTService'
const PAGE_LIMIT = 12

/**
 *
 * @param {{ isLoadMore?: boolean, owner: string limit?: number, page?: number, key?: string, selling?: boolean, type?: number, package?: boolean }} filter
 * @returns
 */
const useMyNFTs = (filter) => {
  const [myNFTsList, setMyNFTsList] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const page = useRef(currentPage)

  useEffect(() => {
    if (filter?.owner) {
      getMyNFTsList()
      getMyMoreNFTs()
    }
  }, [filter])

  const getMyNFTsList = async () => {
    try {
      if (!filter?.isLoadMore) {
        setLoading(true)
        setMyNFTsList([])
        page.current = filter?.page ?? 1
        let nfts = await MyNFTService.getMyNFTs({
          owner: filter?.owner,
          key: filter.key,
          limit: filter.limit ?? PAGE_LIMIT,
          page: filter?.page ?? 1,
          selling: filter?.selling,
          type: filter?.type
        })
        if (nfts && nfts.data && Array.isArray(nfts.data)) {
          let nftsData = [...nfts.data]
          setCurrentPage(1)
          if (window.history.shouldScrollRestore) {
            const { currentPage } = window.history.shouldScrollRestore
            let tmp = 2 // start from page number 2
            if (currentPage) {
              while (tmp <= currentPage) {
                page.current = tmp
                let res = await MyNFTService.getMyNFTs({
                  owner: filter.owner,
                  key: filter.key,
                  limit: filter.limit ?? PAGE_LIMIT,
                  page: tmp,
                  selling: filter?.selling,
                  type: filter?.type
                })
                if (res && res.data && Array.isArray(res.data)) {
                  nftsData = [...nftsData, ...res.data]
                }
                tmp++
              }
              setCurrentPage(currentPage)
            }
          }
          setMyNFTsList(nftsData)
          setTotalItems(nfts.total)
          setTotalPages(nfts.pages)
          setHasMore(true)
          Observer.emit(OBSERVER_KEY.TRIGGER_SCROLL)
        }
        setLoading(false)
      } else {
        setLoading(false)
      }
    } catch (err) {
      setLoading(false)
      console.log('getNFTsList err', err)
    }
  }

  const getMyMoreNFTs = useCallback(async () => {
    try {
      if (filter?.isLoadMore && !loading && filter?.nextPage > currentPage && page.current < filter?.nextPage && filter?.nextPage <= totalPages) {
        setLoadingMore(true)
        page.current = filter?.nextPage
        let nextNFTs = await MyNFTService.getMyNFTs({
          owner: filter.owner,
          key: filter.key,
          limit: filter.limit ?? PAGE_LIMIT,
          page: filter?.nextPage,
          selling: filter?.selling,
          type: filter?.type
        })
        if (nextNFTs && nextNFTs.data && Array.isArray(nextNFTs.data) && nextNFTs.data.length > 0) {
          setMyNFTsList(myNFTsList.concat(nextNFTs.data))
          setCurrentPage(filter?.nextPage)
          setLoadingMore(false)
        } else {
          setHasMore(false)
          setLoadingMore(false)
        }
      }
    } catch (err) {
      setLoadingMore(false)
      console.log('getMoreMyNFT err', err)
    }
  }, [myNFTsList, filter, loading, currentPage, page.current, totalPages])

  return {
    myNFTsList,
    totalItems,
    totalPages,
    currentPage,
    loading,
    loadingMore,
    hasMore
  }
}

export default useMyNFTs
