import { REACT_QUERY_KEY } from 'common/constants'
import { useQuery } from 'react-query'
import GameService from 'services/gameService'
import cookiesService from 'services/cookiesService'
const getUserGameInfo = async ({ queryKey }) => {
  const res = await GameService.getInforUser(await cookiesService.getCookiesByName())
  return res.data
}

export const useGetUserGameInfo = () => {
  const { data, isLoading, error } = useQuery([REACT_QUERY_KEY.GET_USER_GAME_INFO],
    getUserGameInfo
  )
  return {
    isLoadingUserGameInfo: isLoading,
    getUserGameInfoError: error,
    userGameInfo: data
  }
}
