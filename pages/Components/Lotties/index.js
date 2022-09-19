import React from 'react'
import Lottie from 'react-lottie'
import startedAnimation from 'static/Assets/Lotties/started.json'
import successAnimation from 'static/Assets/Lotties/success.json'

const Lotties = ({ width = 35, height = 35, type = 'started', loop = true }) => {
  const getAnimation = () => {
    let animation
    switch (type) {
    case 'started':
      animation = startedAnimation
      break
    case 'success':
      animation = successAnimation
      break
    default:
      animation = startedAnimation
    }
    return animation
  }
  return (
    <Lottie
      options={{
        loop,
        autoplay: true,
        animationData: getAnimation()
      }}
      width={width}
      height={height}
    />
  )
}

export default Lotties
