import { REACT_QUERY_KEY } from 'common/constants'
import { useQuery } from 'react-query'
import MyNFTService from 'services/myNFTService'

const getNFTDetails = async ({ queryKey }) => {
  const address = queryKey[1]
  const id = queryKey[2]
  const response = await MyNFTService.getNFTDetail(address, id)
  return response
}

export const useGetNFTDetails = (address, id, getDetails) => {
  const { data, isLoading, error } = useQuery(
    [REACT_QUERY_KEY.GET_NFT_DETAILS, address, id],
    getNFTDetails,
    { enabled: !!address && !!id && getDetails }
  )
  return {
    isLoadingNFTDetails: isLoading,
    getNFTDetailsError: error,
    details: data
  }
}
