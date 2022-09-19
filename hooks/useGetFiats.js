import { REACT_QUERY_KEY } from 'common/constants'
import Web3Services from 'controller/Web3'
import { useQuery } from 'react-query'

const getFiats = async ({ queryKey }) => {
  let response = null
  const packageContract = queryKey[1].contractToBuy
  response = await Web3Services.getFiats(packageContract)
  return response
}

export const useGetFiats = (sphereDetails) => {
  const { data, isLoading, error } = useQuery(
    [REACT_QUERY_KEY.GET_FIATS, sphereDetails],
    getFiats,
    { enabled: !!sphereDetails }
  )
  return {
    isLoadingFiats: isLoading,
    getFiatsError: error,
    fiats: data
  }
}
