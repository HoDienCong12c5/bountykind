import { REACT_QUERY_KEY } from 'common/constants'
import { useQuery } from 'react-query'
import GameService from 'services/gameService'

const getGachaItems = async () => {
  const response = await GameService.getGachaItems()
  return response.data
}

export const useGetGachaItems = () => {
  const { data, isLoading, error } = useQuery(
    REACT_QUERY_KEY.GET_GACHA_ITEMS,
    getGachaItems
  )
  return {
    isLoadingGachaItems: isLoading,
    getGachaItemsError: error,
    gachaItems: data
  }
}
