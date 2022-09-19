import { NULL_ADDRESS, REACT_QUERY_KEY } from 'common/constants'
import Web3Services from 'controller/Web3'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
const getTokensFiat = async ({ queryKey }) => {
  console.log('queryKey[1]')
  console.log(queryKey[1])
  let symbol = []
  const listAddressToken = queryKey[2]
  if (queryKey[1] && listAddressToken) {
    listAddressToken.map(async (address) => {
      const res = await Web3Services.getTokensFiat(queryKey[1], address)
      symbol.push({ ...res, address: address })
    })

    return symbol
  }
}

export const useGetTokensFiat = (listAddressToken) => {
  const contractCompanyPackage = useSelector(state => state.settingRedux.bsc.contract_company_package)
  const { data, isLoading, error } = useQuery(
    [REACT_QUERY_KEY.GET_LIST_TOKEN_FIAT, contractCompanyPackage, listAddressToken],
    getTokensFiat

  )
  return {
    isLoadingTokenSymbols: isLoading,
    getTokenSymbolsError: error,
    listSymbolFiat: data
  }
}
