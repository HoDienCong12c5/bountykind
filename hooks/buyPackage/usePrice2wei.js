import { NULL_ADDRESS, REACT_QUERY_KEY } from 'common/constants'
import Web3Services from 'controller/Web3'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
const getPrice2wei = async ({ queryKey }) => {
  let symbol = []
  const _price = queryKey[2]
  const _fiatBuy = queryKey[3]
  if (queryKey[1] && queryKey[2] && queryKey[3]) {
    const temp = await Web3Services.getPrice2wei(queryKey[1], _price, _fiatBuy)
    return { price: temp, symbol: _fiatBuy === NULL_ADDRESS ? 'BNB' : 'YU' }
  }
}

export const usePrice2wei = (_price, _fiatBuy) => {
  const contractCompanyPackage = useSelector(state => state.settingRedux.bsc.contract_company_package)
  const { data, isLoading, error } = useQuery(
    [REACT_QUERY_KEY.GET_PRICE_TO_WEI, contractCompanyPackage, _price, _fiatBuy],
    getPrice2wei

  )
  return {
    isLoadingTokenSymbols: isLoading,
    getTokenSymbolsError: error,
    price2Wei: data
  }
}
