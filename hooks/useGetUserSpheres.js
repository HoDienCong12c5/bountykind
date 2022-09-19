import { REACT_QUERY_KEY } from 'common/constants'
import { useQuery } from 'react-query'
import GameService from 'services/gameService'

const getUserSpheres = async ({ queryKey }) => {
  const address = queryKey[1]
  const response = await GameService.getUserSpheres(address)
  const spheres = response.data.data
  let itemSphereByBaseKey = {}
  let characterSphereByBaseKey = {}
  let itemSpheres = []
  let characterSpheres = []
  itemSpheres = spheres.filter(sphere => sphere.type === 'item')
  characterSpheres = spheres.filter(sphere => sphere.type === 'character')
  if (itemSpheres.length > 0) {
    itemSpheres.map((sphere) => {
      if (itemSphereByBaseKey.hasOwnProperty(sphere.baseKey)) {
        itemSphereByBaseKey[sphere.baseKey].total += 1
        itemSphereByBaseKey[sphere.baseKey].spheres.push(sphere)
      } else {
        itemSphereByBaseKey[sphere.baseKey] = {
          image: sphere.image,
          name: sphere.name,
          spheres: [sphere],
          total: 1
        }
      }
    })
  }
  if (characterSpheres.length > 0) {
    characterSpheres.map((sphere) => {
      if (characterSphereByBaseKey.hasOwnProperty(sphere.baseKey)) {
        characterSphereByBaseKey[sphere.baseKey].total += 1
        characterSphereByBaseKey[sphere.baseKey].spheres.push(sphere)
      } else {
        characterSphereByBaseKey[sphere.baseKey] = {
          image: sphere.image,
          name: sphere.name,
          spheres: [sphere],
          total: 1
        }
      }
    })
  }
  return {
    itemSphereByBaseKey,
    characterSphereByBaseKey
  }
}

export const useGetUserSpheres = (address, type) => {
  const { data, isLoading, error } = useQuery(
    [REACT_QUERY_KEY.GET_USER_SPHERES, address, type],
    getUserSpheres,
    { enabled: !!address }
  )
  return {
    isLoadingUserSpheres: isLoading,
    getUserSpheresError: error,
    userSpheres: data
  }
}
