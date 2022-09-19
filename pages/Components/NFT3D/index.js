import React, { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls, useFBX, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import styled from 'styled-components'
import { Spin } from 'antd'
import { COLOR } from 'common/constants'
import gameService from 'services/gameService'
import { useSelector } from 'react-redux'
import { LoadingOutlined } from '@ant-design/icons'

const Demon_ANIMA = '../../../Demon_ANIMA.png'
const Demon_AQUA = '../../../Demon_AQUA.png'
const Demon_EARTH = '../../../Demon_EARTH.png'
const Demon_ELEKI = '../../../Demon_ELEKI.png'
const Demon_IGNIS = '../../../Demon_IGNIS.png'
const Demon_PLANT = '../../../Demon_PLANT.png'
const textTureBasic = '../../../basicColor.png'
const Scene = ({
  isLoad,
  setIsLoad,
  modal = '../../../basicChar.fbx',
  textTure = textTureBasic,
  animation = '../../../attack.fbx'
}) => {
  const [indexAction, setIndexAction] = useState(0)
  const colorMap = useLoader(THREE.TextureLoader, textTure)
  const fbx = useFBX(modal)
  const AnFBX = useFBX(animation)
  const AnFBX2 = useFBX('../../../anhappy.fbx')
  const material = new THREE.MeshLambertMaterial({
    lightMap: colorMap,
    map: colorMap
  })
  const propellerMesh = useRef()
  const lastAction = useRef(0)
  const listAction = useRef([])

  useEffect(() => {
    const addAni = async () => {
      await fbx.animations.push(AnFBX.animations[0])
      await fbx.animations.push(AnFBX2.animations[0])
      await init()
      setIsLoad(false)
    }
    if (AnFBX && fbx) {
      addAni()
    }
  }, [fbx, AnFBX])
  useEffect(() => {
    if (!isLoad) {
      if (indexAction === 0) {
        actionStop(actions2.actions)
        actionsPlay(actions1.actions)
      } else {
        actionStop(actions1.actions)
        actionsPlay(actions2.actions)
      }
    }
  }, [indexAction, isLoad])

  useEffect(() => {
    let animationInterval = null
    if (!isLoad) {
      animationInterval = setInterval(() => {
        onCLickAction()
      }, 10000)
    }
    return () => clearInterval(animationInterval)
  }, [isLoad, indexAction])

  const init = async () => {
    fbx?.traverse((ob) => {
      ob.material = material
    })
    fbx.animations.map((ob, index) => {
      if (!listAction.current.includes(ob.name)) {
        listAction.current.push(ob.name)
      }
    })
  }
  const actions1 = useAnimations(AnFBX.animations, propellerMesh)
  const actions2 = useAnimations(AnFBX2.animations, propellerMesh)
  const getNameAction = (indexAction) => {
    if (listAction.current.length < 2) {
      return listAction.current[0]
    }
    return listAction.current[indexAction]
  }

  const actionStop = (action) => {
    if (action[getNameAction(indexAction)]) {
      action[getNameAction(indexAction)]?.stop()
    }
  }

  const actionsPlay = (action) => {
    if (action[getNameAction(indexAction)]) {
      action[getNameAction(indexAction)]?.fadeIn(0.5)?.play()
    }
  }
  const onCLickAction = () => {
    if (indexAction === 0) {
      lastAction.current = 0
      setIndexAction(1)
    } else {
      lastAction.current = 1
      setIndexAction(0)
    }
  }

  return (
    <mesh ref={propellerMesh}>
      {/* <axesHelper /> */}
      <primitive object={fbx} scale={0.04} />
    </mesh>
  )
}

const NFT3D = ({ nftId, close3D }) => {
  const messages = useSelector((state) => state.locale.messages)

  const [isLoad, setIsLoad] = useState(true)
  const [isLoadServer, setIsLoadServer] = useState(true)
  const [data3D, setData3D] = useState(null)
  const closeCanvas = () => {
    const div3d = document.getElementById('nft-3d')
    while (div3d.firstChild) {
      div3d.removeChild(div3d.firstChild)
    }
    close3D()
  }
  useEffect(() => {
    const getData3D = async () => {
      const res = await gameService.getNFT3Detail(nftId)
      if (res.status === 'success') {
        setData3D(res.data)
        setIsLoadServer(false)
      } else {
        setIsLoadServer(false)
      }
    }
    if (isLoadServer) {
      // getData3D()
    }
  }, [isLoadServer])

  return (
    <Container>
      <Close3D onClick={isLoad ? null : () => closeCanvas()}>
        {isLoad ? messages.common['3DLoading'] : messages.common.close3D}
        {isLoad && (
          <ContainerLoading >
            <Spin size='large' style={{ marginTop: '30%' }} indicator={antIcon} />

          </ContainerLoading>
        )}
      </Close3D>
      {isLoadServer && (
        <CanvasCustom id='nft-3d'>
          {/* <color attach='background' args={['#d0d0d0']} /> */}
          <Suspense fallback={null}>
            <pointLight
              rotation={[100, 10, 0]}
              position={[10, 1, 1000]}
              intensity={0.2}
            />
            <Scene isLoad={isLoad} setIsLoad={setIsLoad} />
            <OrbitControls
              target0={[0, 2, 0]}
              enableZoom={false}
              target={[0, 2, 0]}
            // minPolarAngle={Math.PI / 2}
            // maxPolarAngle={Math.PI / 2}
            />
          </Suspense>
        </CanvasCustom>
      )}
    </Container>
  )
}
export default React.memo(NFT3D)

const antIcon = (
  <LoadingOutlined style={{ fontSize: 40, color: 'white' }} spin />
)
const Container = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  position: relative;
  @media screen and (max-width: 568px) {
    margin-top: 10px;
  }
`
const Close3D = styled.div`
position:relative;
  font-size: 16px;
  color: ${COLOR.purple};
  display: flex;
  flex-flow: column wrap;
  gap: 30px;
  text-align: center;
  cursor: pointer;
  z-index: 10;
  @media screen and (max-width: 568px) {
    font-size: 12px;
  }
  &:hover {
    cursor: pointer;
  }
`
const CanvasCustom = styled(Canvas)`
  display: flex;
  flex: 1;
  canvas {
    transform: translateY(20px);
  }

`
const ContainerLoading = styled.div`
  position:absolute;

  --color: ${COLOR.white2}; /* color */
  width: 100%;
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  border: ${(props) => (props.border ? '1px solid var(--color)' : 'none')};
  border-radius: 16px;
  margin-top: ${(props) => (props.border ? '26px' : '0px')};
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column wrap;
  }
  gap: 20px;
`
