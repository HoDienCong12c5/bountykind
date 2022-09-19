import { REACT_QUERY_KEY } from 'common/constants'
import Web3Services from 'controller/Web3'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
const getTypeNFT = async ({ queryKey }) => {
  let response = null
  const sphereDetails = queryKey[1]
  const packageContract = queryKey[2]
  response = await Web3Services.getTypeNFT(packageContract, sphereDetails.typeId, sphereDetails.contractAddress)
  return response
}

export const useGetTypeNFT = (sphereDetails) => {
  const contractCompanyPackage = useSelector(state => state.settingRedux.bsc.contract_company_package)

  const { data, isLoading, error } = useQuery(
    [REACT_QUERY_KEY.GET_TYPE_FIATS, sphereDetails, contractCompanyPackage],
    getTypeNFT,
    { enabled: !!sphereDetails }
  )
  return {
    isLoadingFiats: isLoading,
    getFiatsError: error,
    fiats: data
  }
}
