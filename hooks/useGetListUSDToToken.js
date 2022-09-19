import { REACT_QUERY_KEY, NULL_ADDRESS } from 'common/constants'
import { useQuery } from 'react-query'
import Web3Services from 'controller/Web3'
import { convertWeiToBalance } from 'common/function'
const getUsdToToken = async ({ queryKey }) => {
  let listFiat = []
  console.log(queryKey[1])
  if (queryKey[1]) {
    const tempListFiat = queryKey[1]
    const contractFiat = queryKey[2]
    const getAllAmountToken = tempListFiat.map(async (item) => {
      const response = await Web3Services.getTokenToUSDPrice(item.symbol, contractFiat)
      if (response) {
        listFiat.push({
          token: item.symbol,
          amount: convertWeiToBalance(response._token2USD, 18)
        })
      }
      return listFiat
    })
    await Promise.all(getAllAmountToken)
  }

  return listFiat
}

export const useGetListUSDToToken = (listTokenFiat = [], contractFiat) => {
  const { data, isLoading, error } = useQuery(
    [REACT_QUERY_KEY.GET_USD_TO_TOKEN, listTokenFiat, contractFiat],
    getUsdToToken,
    { enabled: listTokenFiat.length > 0 || false }
  )
  return {
    isLoadingUsdToToken: isLoading,
    getUsdToTokenError: error,
    listAmountToken: data
  }
}
