import { REACT_QUERY_KEY } from 'common/constants'
import Web3Services from 'controller/Web3'
import { useQuery } from 'react-query'

const getnftTokenPriceInWei = async ({ queryKey }) => {
  let value = 0
  const tokenSymbols = queryKey[1]
  const selectedTokenAddress = queryKey[2]
  const selectedTokenSymbol = tokenSymbols.filter(token => token.address === selectedTokenAddress)[0].symbol
  const priceUsd = queryKey[3].priceUsd
  const packageContract = queryKey[4].contractToBuy
  const response = await Web3Services.getTokenIdToWei(priceUsd, selectedTokenSymbol, packageContract)
  value = response
  return value
}

export const useGetNftTokenPriceInWei = (tokenSymbols, selectedTokenAddress, onchainPackageDetails, sphereDetails) => {
  const { data, isLoading, error } = useQuery(
    [REACT_QUERY_KEY.GET_TOKEN_PRICE_IN_WEI,
      tokenSymbols,
      selectedTokenAddress,
      onchainPackageDetails,
      sphereDetails
    ],
    getnftTokenPriceInWei,
    { enabled: !!tokenSymbols && !!selectedTokenAddress && !!onchainPackageDetails && !!sphereDetails }
  )
  return {
    isLoadingnftTokenPriceInWei: isLoading,
    errorGetnftTokenPriceInWei: error,
    nftTokenPriceInWei: data
  }
}
