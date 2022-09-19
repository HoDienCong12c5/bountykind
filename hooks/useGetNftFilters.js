import { REACT_QUERY_KEY } from 'common/constants'
import { useQuery } from 'react-query'
import MarketService from 'services/marketService'

const getNftFilters = async () => {
  const response = await MarketService.getAllMarketFilters()
  return response.data.data
}

export const useGetNftFilters = () => {
  const { data, isLoading, error } = useQuery(
    [REACT_QUERY_KEY.GET_NFT_FILTERS],
    getNftFilters
  )

  return {
    isLoadingGetMarketFilters: isLoading,
    getMarketFiltersError: error,
    marketFiltersData: data
  }
}
