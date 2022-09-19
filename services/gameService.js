import axios from 'axios'

const baseUrl = process.env.API_GAME
const baseUrlApp = process.env.API_APP
const GameService = {
  getUserGameData: async function (address, token) {
    const url = baseUrl + `/users/${address}`
    const response = await axios({
      url,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (response.status === 200) {
      return {
        data: response.data.data,
        status: 'success'
      }
    } else {
      return {
        message: 'error',
        status: 'error'
      }
    }
  },
  getCharactersItemData: async function (address, id) {
    const url = baseUrl + `/user-characters/detail?contractAddress=${address}&nftId=${id}`
    const response = await axios({
      url,
      method: 'GET'
    })
    if (response.status === 200) {
      return {
        data: response.data.data,
        status: 'success'
      }
    } else {
      return {
        message: 'error',
        status: 'error'
      }
    }
  },
  getItemInfoData: async function (address, id) {
    const url = baseUrl + `/user-items/detail?contractAddress=${address}&nftId=${id}`
    const response = await axios({
      url,
      method: 'GET'
    })
    if (response.status === 200) {
      return {
        data: response.data.data,
        status: 'success'
      }
    } else {
      return {
        message: 'error',
        status: 'error'
      }
    }
  },
  getShapphireInfoData: async function (address, id) {
    const url = baseUrl + `/user-items/detail?contractAddress=${address}&nftId=${id}`
    const response = await axios({
      url,
      method: 'GET'
    })
    if (response.status === 200) {
      return {
        data: response.data.data,
        status: 'success'
      }
    } else {
      return {
        message: 'error',
        status: 'error'
      }
    }
  },

  getGachaItems: async function () {
    const url = baseUrl + `/game-items?active=true`
    const response = await axios({
      url,
      method: 'GET'
    })
    if (response.status === 200) {
      return {
        data: response.data.data,
        status: 'success'
      }
    } else {
      return {
        message: 'error',
        status: 'error'
      }
    }
  },
  getGachaCharacters: async function () {
    const url = baseUrl + `/game-characters?active=true`
    const response = await axios({
      url,
      method: 'GET'
    })
    if (response.status === 200) {
      return {
        data: response.data.data,
        status: 'success'
      }
    } else {
      return {
        message: 'error',
        status: 'error'
      }
    }
  },
  getGachaResult: async function (token, txHash) {
    const url = baseUrl + `/gacha?txHash=${txHash}`
    const response = await axios({
      url,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  },
  getAllNFTOfUser: async function (queryString) {
    const url = baseUrl + `/user-sapphires${queryString}`
    const response = await axios({
      url
    })
    if (response.status === 200) {
      return {
        data: response.data,
        totalPage: response.data.pages,
        status: 'success'
      }
    } else {
      return {
        message: 'error',
        status: 'error'
      }
    }
  },
  getInforDetailsNFT: async function (address, id) {
    const url = baseUrl + `/nfts/${address}/${id}`
    const response = await axios({
      url
    })
    if (response.status === 200) {
      return {
        data: response.data.data,
        status: 'success'
      }
    } else {
      return {
        message: 'error',
        status: 'error'
      }
    }
  },
  getInforUser: async function (auth) {
    const url = baseUrl + `/users/detail`
    const response = await axios({
      url,
      headers: {
        Authorization: `Bearer ${auth}`
      }
    })
    if (response.status === 200) {
      return {
        data: response.data.data,
        status: 'success'
      }
    } else {
      return {
        message: 'error',
        status: 'error'
      }
    }
  },
  getSpheres: async function (query) {
    const url = baseUrl + `/game-sapphires${query}`
    const response = await axios({
      url,
      method: 'GET'
    })
    if (response.status === 200) {
      return {
        data: response.data.data,
        status: 'success'
      }
    } else {
      return {
        message: 'error',
        status: 'error'
      }
    }
  },
  getSphereDetails: async function (id) {
    const url = baseUrl + `/game-sapphires/${id}`
    const response = await axios({
      url,
      method: 'GET'
    })
    if (response.status === 200) {
      return {
        data: response.data.data,
        status: 'success'
      }
    } else {
      return {
        message: 'error',
        status: 'error'
      }
    }
  },
  getUserSpheres: async function (address) {
    const url = baseUrl + `/user-sapphires?owner=${address}`
    const response = await axios({
      url,
      method: 'GET'
    })
    if (response.status === 200) {
      return {
        data: response.data.data,
        status: 'success'
      }
    } else {
      return {
        message: 'error',
        status: 'error'
      }
    }
  },
  getUserSphereDetails: async function (id) {
    const url = baseUrl + `/user-sapphires/${id}`
    const response = await axios({
      url,
      method: 'GET'
    })
    if (response.status === 200) {
      return {
        data: response.data.data,
        status: 'success'
      }
    } else {
      return {
        message: 'error',
        status: 'error'
      }
    }
  },
  getGameCharacters: async function () {
    const url = baseUrl + `/game-characters?active=true&gift=true`
    const response = await axios({
      url,
      method: 'GET'
    })
    if (response.status === 200) {
      return {
        data: response.data.data,
        status: 'success'
      }
    } else {
      return {
        message: 'error',
        status: 'error'
      }
    }
  },
  getGameCharactersUser: async function (ownerAddress, queryString) {
    const url =
      baseUrl + `/user-characters${queryString}&owner=${ownerAddress}`
    const response = await axios({
      url,
      method: 'GET'
    })
    if (response.status === 200) {
      return {
        data: response.data.data,
        status: 'success'
      }
    } else {
      return {
        message: 'error',
        status: 'error'
      }
    }
  },
  getGiftNft: async function (keyBase64) {
    const url = baseUrl + `/gacha/pool/${keyBase64}`
    const response = await axios({
      url
    })
    if (response.status === 200) {
      return {
        data: response.data.data,
        status: 'success'
      }
    } else {
      return {
        message: 'error',
        status: 'error'
      }
    }
  },
  mintCharacters: async function (body, auth) {
    const url = baseUrl + `/users/receive-gifts`
    const response = await axios({
      url,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${auth}`
      },
      data: body
    })
    if (response.status === 200) {
      return {
        data: response.data,
        status: 'success'
      }
    } else {
      return {
        message: 'error',
        status: 'error'
      }
    }
  },
  getUserItems: async function (queryString) {
    const url = baseUrl + `/user-items${queryString}`
    const response = await axios({
      url,
      method: 'GET'
    })
    if (response.status === 200) {
      return {
        data: response.data.data,
        status: 'success'
      }
    } else {
      return {
        message: 'error',
        status: 'error'
      }
    }
  },
  changePointToToken: async function (body, token) {
    const url = baseUrl + `/users/withdraw`
    const response = await axios({
      url,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: body
    })
    if (response.status === 200) {
      return {
        data: response.data,
        status: 'success'
      }
    } else {
      return {
        message: 'error',
        status: 'error'
      }
    }
  },
  getUserCharacterDetails: async function (id) {
    const url = baseUrl + `/user-characters/${id}`
    const response = await axios({
      url,
      method: 'GET'
    })
    if (response.status === 200) {
      return {
        data: response.data.data,
        status: 'success'
      }
    } else {
      return {
        message: 'error',
        status: 'error'
      }
    }
  },
  getUserItemDetails: async function (id) {
    const url = baseUrl + `/user-items/${id}`
    const response = await axios({
      url,
      method: 'GET'
    })
    if (response.status === 200) {
      return {
        data: response.data.data,
        status: 'success'
      }
    } else {
      return {
        message: 'error',
        status: 'error'
      }
    }
  },
  getInforPlayer: async function (address) {
    const url = baseUrl + `/user/${address}`
    const response = await axios({
      url
    })
    if (response.status === 200) {
      return {
        data: response.data,
        status: 'success'
      }
    } else {
      return {
        message: 'error',
        status: 'error'
      }
    }
  },
  getNFT3Detail: async function (nftId, type = '') {
    const url = baseUrl + `/nft3d/${nftId}/type`
    const response = await axios({
      url
    })
    if (response.status === 200) {
      return {
        data: response.data,
        status: 'success'
      }
    } else {
      return {
        message: 'error',
        status: 'error'
      }
    }
  }
}

export default GameService
