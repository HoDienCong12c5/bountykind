import { REACT_QUERY_KEY } from 'common/constants'
import { useQuery } from 'react-query'
import GameService from 'services/gameService'

const getSpheres = async ({ queryKey }) => {
  let queryString = queryKey[1]
  if (queryString?.trim() !== '') {
    queryString += '&active=true'
  } else {
    queryString = '?active=true'
  }
  const response = await GameService.getSpheres(queryString)
  return response.data
}

export const useGetSpheres = (queryString) => {
  const { data, isLoading, error } = useQuery(
    [REACT_QUERY_KEY.GET_SPHERES, queryString],
    getSpheres
  )
  return {
    isLoadingGetSpheres: isLoading,
    getSpheresError: error,
    spheres: data
  }
}
