import { REACT_QUERY_KEY } from 'common/constants'
import { useQuery } from 'react-query'
import StoreService from 'services/storeService'

const getSellingNFTs = async ({ queryKey }) => {
  let result = {
    sellingNfts: [],
    totalNfts: 0,
    totalPages: 0
  }
  const queryString = queryKey[1]
  const response = await StoreService.getSellingNFTsWithQueryString(queryString)
  if (response.data) {
    result.sellingNfts = response.data
    result.totalNfts = response.total
    result.totalPages = response.totalPages
  } else {
    result.sellingNfts = []
    result.totalNfts = 0
    result.totalPages = 0
  }
  return result
}

export const useGetSellingNFTs = (queryString) => {
  const { data, isLoading, error } = useQuery(
    [REACT_QUERY_KEY.GET_SELLING_NFTS, queryString],
    getSellingNFTs,
    { enabled: !!queryString }
  )
  return {
    isLoadingSellingNfts: isLoading,
    getSellingNFTsError: error,
    getSellingNftsData: data
  }
}
