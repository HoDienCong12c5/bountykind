import { useState, useEffect } from 'react'
import StoreService from 'services/storeService'

const useSellingNFTs = (filter) => {
  const PAGE_LIMIT = 25
  const [nfts, setNfts] = useState(null)
  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
    if (filter) {
      if (filter.page === 1) {
        getNFTs()
      } else {
        getNFTsMore()
      }
    }
  }, [filter])

  const getNFTs = async () => {
    try {
      let filters = {
        page: filter?.page ?? 1,
        limit: filter.limit ?? PAGE_LIMIT,
        sort: filter.sort ?? 'createdAt',
        direction: filter.direction ?? 'desc'
      }
      if (filter.key) {
        filters.key = filter.key
      }
      if (filter.type) {
        filters.type = filter.type
      }
      setNfts([])
      setLoading(true)
      let nfts = await StoreService.getSellingNFTs(filters)
      if (nfts && nfts.data && Array.isArray(nfts.data)) {
        let nftsData = [...nfts.data]
        setCurrentPage(filter.page)
        setNfts(nftsData)
        setTotalItems(nfts.total)
        setTotalPages(nfts.totalPages)
        if (nfts.totalPages > 1) {
          setHasMore(true)
        } else {
          setHasMore(false)
        }
        setLoading(false)
      } else {
        setLoading(false)
        setHasMore(false)
      }
    } catch (err) {
      setLoading(false)
      setHasMore(false)
      console.log('getSellingNFTs err', err)
    }
  }

  const getNFTsMore = async () => {
    try {
      setLoadingMore(true)
      if (filter.page < totalPages) {
        setHasMore(true)
      } else {
        setHasMore(false)
      }
      let filters = {
        page: filter?.page ?? 1,
        limit: filter.limit ?? PAGE_LIMIT,
        sort: filter.sort ?? 'createdAt',
        direction: filter.direction ?? 'desc'
      }
      if (filter.key) {
        filters.key = filter.key
      }
      if (filter.type) {
        filters.type = filter.type
      }
      let nfts = await StoreService.getSellingNFTs(filters)
      if (nfts && nfts.data && Array.isArray(nfts.data)) {
        let nftsData = [...nfts.data]
        setCurrentPage(filter.page)
        setNfts(arr => [...arr, ...nftsData])
        setTotalItems(nfts.total)
        setTotalPages(nfts.totalPages)
        setLoading(false)
        setLoadingMore(false)
        if (currentPage === totalPages) {
          setHasMore(false)
        }
      } else {
        setLoadingMore(false)
        setHasMore(false)
      }
    } catch (err) {
      setLoadingMore(false)
      setHasMore(false)
      console.log('getSellingNFTsMore err', err)
    }
  }

  return {
    nfts,
    totalItems,
    totalPages,
    currentPage,
    loading,
    loadingMore,
    hasMore
  }
}

export default useSellingNFTs
