import { NULL_ADDRESS, REACT_QUERY_KEY } from 'common/constants'
import Web3Services from 'controller/Web3'
import { useQuery } from 'react-query'

const getTokenSymbols = async ({ queryKey }) => {
  let tokenSymbols = []
  if (queryKey[1]) {
    const tokenArr = queryKey[1]
    console.log({ tokenArr })
    const getAllTokenSymbols = tokenArr.map(async (tokenAddress) => {
      if (tokenAddress !== NULL_ADDRESS) {
        const symbol = await Web3Services.getTokenSymbol(tokenAddress)
        tokenSymbols.push({ tokenAddress, symbol })
      } else {
        const symbol = 'BNB'
        tokenSymbols.push({ tokenAddress, symbol })
      }
      return tokenSymbols
    })
    await Promise.all(getAllTokenSymbols)
  }
  return tokenSymbols
}

export const useGetTokenSymbols = (fiats) => {
  const { data, isLoading, error } = useQuery(
    [REACT_QUERY_KEY.GET_TOKEN_SYMBOLS, fiats],
    getTokenSymbols,
    { enabled: !!fiats }
  )
  return {
    isLoadingTokenSymbols: isLoading,
    getTokenSymbolsError: error,
    tokenSymbols: data
  }
}
