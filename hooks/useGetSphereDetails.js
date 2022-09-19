import { REACT_QUERY_KEY } from 'common/constants'
import { useQuery } from 'react-query'
import GameService from 'services/gameService'

const getSphereDetails = async ({ queryKey }) => {
  const id = queryKey[1]
  const response = await GameService.getSphereDetails(id)
  return response.data
}

export const useGetSphereDetails = (id) => {
  const { data, isLoading, error } = useQuery([REACT_QUERY_KEY.GET_SPHERE_DETAILS, id], getSphereDetails, {
    enabled: !!id
  })
  return {
    isLoadingSphereDetails: isLoading,
    getSphereDetailsError: error,
    sphereDetails: data
  }
}
