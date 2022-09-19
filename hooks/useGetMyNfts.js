import { REACT_QUERY_KEY } from 'common/constants'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import GameService from 'services/gameService'

const getMyNFTs = async ({ queryKey }) => {
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

export const useGetMyNfts = (currentQueryString, nftType) => {
  // console.log({ nftType })
  const userData = useSelector(state => state.userData)
  const { data, isLoading, error } = useQuery(
    [REACT_QUERY_KEY.GET_MY_NFTS, currentQueryString, nftType, userData],
    getMyNFTs,
    { enabled: !!userData && nftType === 'sapphire' }
  )
  return {
    isLoadingGetMyNfts: isLoading,
    getMyNFTsError: error,
    myNftsData: data
  }
}
