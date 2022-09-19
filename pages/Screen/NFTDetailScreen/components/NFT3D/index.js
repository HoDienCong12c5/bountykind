import React, { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls, useFBX, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import styled from 'styled-components'
import { Spin } from 'antd'
import { COLOR } from 'common/constants'
const Container = styled.div`
  margin-top: 20px;
  width:100%;
  height:100%;
  min-height:300px;
  display: flex;
  flex-direction: column;
  /* flex-flow: column ; */
  @media screen and (max-width: 568px) {
    margin-top: 10px;
  }
  canvas{
    height:120%;
  }
`
const Close3D = styled.div`
  font-size: 16px;
  color: ${COLOR.purple};
  display: flex;
  flex-flow: column wrap;
  gap: 30px;
  text-align: center;
  cursor: pointer;
  z-index: 100;
  @media screen and (max-width: 568px) {
    font-size: 12px;
  }
  &:hover {
    cursor: pointer;
  }
  /* margin-bottom: 10px; */
`
const Scene = ({ isLoad, setIsLoad }) => {
  const [indexAction, setIndexAction] = useState(0)
  // const animationActions = useRef([])

  const colorMap = useLoader(THREE.TextureLoader, '../../../basicColor.png')
  // const fbx = useFBX("../../../ChaAndAni.fbx");
  const fbx = useFBX('../../../basicChar.fbx')
  const AnFBX = useFBX('../../../attack.fbx')
  const AnFBX2 = useFBX('../../../anhappy.fbx')
  const material = new THREE.MeshLambertMaterial({
    lightMap: colorMap,
    lightMapIntensity: 1,
    map: colorMap
  })
  const propellerMesh = useRef()
  const lastAction = useRef(0)

  useFrame(({ clock }) => {
    // propellerMesh.current.rotation.z = clock.getElapsedTime();
  })
  useEffect(() => {
    const addAni = async () => {
      await fbx.animations.push(AnFBX.animations[0])
      await fbx.animations.push(AnFBX.animations[0])
      await init()
    }
    if (AnFBX && fbx) {
      addAni()
    }
  }, [fbx, AnFBX])
  const init = () => {
    fbx?.traverse((ob) => {
      ob.material = material
    })
    if (fbx?.animations !== []) {
      setIsLoad(false)
    }
  }
  const { actions } = useAnimations(AnFBX.animations, propellerMesh)
  const useAn2 = useAnimations(AnFBX2.animations, propellerMesh)

  useEffect(() => {
    if (!isLoad) {
      if (indexAction === 0) {
        console.log('start attack====')
        useAn2.actions['Take 001']?.stop()
        actions['Take 001']?.reset()?.fadeIn(0.5)?.play()
      } else {
        actions['Take 001']?.stop()
        useAn2.actions['Take 001']?.reset()?.fadeIn(0.5)?.play()
      }
    }
  }, [actions, indexAction, isLoad])
  const onLickAction = () => {
    if (indexAction === 0) {
      console.log('onLickAction1')

      lastAction.current = 0
      setIndexAction(1)
    } else {
      console.log('onLickAction')

      lastAction.current = 1
      setIndexAction(0)
    }
  }
  useEffect(() => {
    if (!isLoad) {
      setTimeout(() => {
        onLickAction()
      }, 10000)
    }
  }, [isLoad, indexAction])

  return (
    // <mesh ref={propellerMesh} position={[0, -2, 0]} >
    <mesh ref={propellerMesh} position={[0, 0, 0]} >
      {/* <axesHelper /> */}
      <primitive
        position={[0, 0, 0]}
        object={fbx}
        scale={0.04}
      />
    </mesh>
  )
}

export default function App ({ size, close3D }) {
  const [isLoad, setIsLoad] = useState(true)

  const closeCanvas = () => {
    const div3d = document.getElementById('nft-3d')
    while (div3d.firstChild) {
      div3d.removeChild(div3d.firstChild)
    }
    close3D()
  }
  useEffect(() => {
    if (!isLoad) {
      const canvas = document.getElementById('canvas')
      // console.log(canvas.getContext('2d'))
      // var ctx = canvas.getContext('2d')
      // ctx.fillStyle = 'blue'
      // ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  }, [isLoad])

  return (
    <Container >
      <Close3D onClick={isLoad ? null : () => closeCanvas()}>
        {isLoad ? '3D loading...' : 'Close 3D'}
        {isLoad && <Spin size='large' />}
      </Close3D>
      <div id='nft-3d' style={{ height: '100%', width: '100%' }}>
        <Canvas style={{ flex: '1', display: 'flex' }} >
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
        </Canvas>
      </div>
    </Container>
  )
}
