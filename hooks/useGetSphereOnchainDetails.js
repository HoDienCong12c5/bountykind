import { REACT_QUERY_KEY } from 'common/constants'
import Web3Services from 'controller/Web3'
import { useQuery } from 'react-query'

const getSphereOnchainDetails = async ({ queryKey }) => {
  let details = {}
  const nftDetails = queryKey[1]
  const { contractToBuy, typeId } = nftDetails
  const response = await Web3Services.getPackageDetails(typeId, contractToBuy)
  if (response?.pricesUsd) {
    const _priceUsd = response.pricesUsd
    details.priceUsd = _priceUsd
  }
  return details
}

export const useGetSphereOnchainDetails = (sphereDetails) => {
  const { data, isLoading, error } = useQuery(
    [REACT_QUERY_KEY.GET_SPHERE_ONCHAIN_DETAILS, sphereDetails],
    getSphereOnchainDetails,
    { enabled: !!sphereDetails }
  )
  return {
    isLoadingOnchainPackageDetails: isLoading,
    errorGetOnchainPackageDetails: error,
    onchainPackageDetails: data
  }
}
