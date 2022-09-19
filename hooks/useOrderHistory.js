import { REACT_QUERY_KEY } from 'common/constants'
import { useState } from 'react'
import { useQuery } from 'react-query'
import StoreService from 'services/storeService'

const PAGE_LIMIT = 48

const getOrderHistory = async ({ queryKey }) => {
  const nftAddress = queryKey?.[1] || ''
  const query = queryKey?.[2] || {}
  const res = await StoreService.getOrderHistory(nftAddress, query)
  return res
}

const useOrderHistory = (nftAddress, id) => {
  const [page, setPage] = useState(1)
  const { data, isLoading } = useQuery([REACT_QUERY_KEY.GET_ORDER_HISTORY, nftAddress, { page, limit: PAGE_LIMIT, id }], getOrderHistory, { enabled: !!id && !!nftAddress })

  const changePage = (p) => {
    setPage(p)
  }

  return {
    isLoadingOrderHistory: isLoading,
    data: data?.data || [],
    total: data?.total || 0,
    limit: data?.limit || 0,
    page: data?.page || page,
    totalPage: data?.totalPages || 0,
    changePage
  }
}

export default useOrderHistory
