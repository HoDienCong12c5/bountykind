import { REACT_QUERY_KEY } from 'common/constants'
import { useQuery } from 'react-query'
import GameService from 'services/gameService'
import { useSelector } from 'react-redux'

const getUserNFTs = async ({ queryKey }) => {
  let queryString = queryKey[1]
  const nftType = queryKey[2]
  const userData = queryKey[3]
  if (queryString.trim().length === 0) {
    queryString = `?owner=${userData.address}&limit=10`
  } else {
    queryString += `&owner=${userData.address}&limit=10`
  }
  // queryString += `&type=${nftType}`
  const regex = /\[.*]&/
  queryString = queryString.replace(regex, '')
  queryString = queryString.replaceAll('attributes.sapphire.', '')
  const response = await GameService.getAllNFTOfUser(queryString)
  return {
    nfts: response.data.data,
    total: response.data.total,
    totalPage: response.data.totalPage
  }
}

export const useGetUserNFTs = (currentQueryString, nftType, address) => {
  const userData = useSelector(state => state.userData)

  const { data, isLoading, error } = useQuery(
    [REACT_QUERY_KEY.GET_USER_NFTS, currentQueryString, nftType, userData],
    getUserNFTs,
    { enabled: !!address && nftType === 'sapphire' }
  )
  return {
    isLoadingGetUserNfts: isLoading,
    getUserNFTsError: error,
    userNftsData: data
  }
}
