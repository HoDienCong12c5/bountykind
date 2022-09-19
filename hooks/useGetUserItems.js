import { REACT_QUERY_KEY } from 'common/constants'
import { useQuery } from 'react-query'
import GameService from 'services/gameService'

const getUserItems = async ({ queryKey }) => {
  const address = queryKey[1]
  let queryString = queryKey[2]
  if (queryString.trim() === '') {
    queryString = `?limit=10&owner=${address}&status=active`
  } else {
    queryString += `&limit=10&owner=${address}&status=active`
  }
  queryString = queryString.replaceAll('attributes.item.', '')
  console.log({ queryString })
  const response = await GameService.getUserItems(queryString)
  if (response.data) {
    return {
      userItems: response.data.data,
      total: response.data.total,
      totalPages: response.data.pages
    }
  } else {
    return {
      userItems: [],
      total: 0,
      totalPages: 0
    }
  }
}

export const useGetUserItems = (queryString, viewOption, userAddress) => {
  const { data, isLoading, error } = useQuery(
    [REACT_QUERY_KEY.GET_USER_ITEMS, userAddress, queryString],
    getUserItems,
    { enabled: !!userAddress && !!viewOption && viewOption === 'item' }
  )
  return {
    isLoadingUserItems: isLoading,
    getUserItemsError: error,
    userItemsData: data
  }
}
