import { NULL_ADDRESS, REACT_QUERY_KEY } from 'common/constants'
import Web3Services from 'controller/Web3'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
const getTokensList = async ({ queryKey }) => {
  let symbol = []
  if (queryKey[1]) {
    const temp = await Web3Services.getTokensList(queryKey[1])
    temp.map(tokenAddress => {
      symbol.push({ tokenAddress, symbol: tokenAddress === NULL_ADDRESS ? 'BNB' : 'YU' })
    })
    return symbol
  }
}

export const useGetTokensList = () => {
  const contractCompanyPackage = useSelector(state => state.settingRedux.bsc.contract_company_package)
  const { data, isLoading, error } = useQuery(
    [REACT_QUERY_KEY.GET_LIST_TOKEN_LIST, contractCompanyPackage],
    getTokensList

  )
  return {
    isLoadingTokenSymbols: isLoading,
    getTokenSymbolsError: error,
    tokenSymbols: data
  }
}
