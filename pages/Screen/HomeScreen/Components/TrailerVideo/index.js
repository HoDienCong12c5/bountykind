import React, { useState, useRef, useEffect } from 'react'

const TrailerVideo = () => {
  const refVideo = useRef(0)
  const [heightVideo, setHeightVideo] = useState(0)
  window.addEventListener('resize', function () {
    setHeightVideo(refVideo.current.getBoundingClientRect().height)
  })
  useEffect(() => {
    setTimeout(() => {
      const video = refVideo.current
      setHeightVideo(video.getBoundingClientRect())
      console.log('====================================')
      console.log(video.getBoundingClientRect().height)
      console.log('====================================')
    }, 500)
  }, [])
  console.log('====================================')
  console.log('heightVideo', heightVideo)
  console.log('====================================')
  return (
    <div style={{ textAlign: 'center' }}>
      <video src='https://ipfs.pantograph.app/ipfs/QmbfyX1JMFzCAcWDiwzM5N9hZZFeBAjZwmcFaLynm2wXnh?filename=Tainted%20Grail_%20Fall%20of%20Avalon%20-%20Official%20Cinematic%20Trailer.mp4'
        autoPlay
        ref={refVideo}
        muted
        loop
        controls={false}
        repeat
        // width={'100%'}
        style={{
          transform: 'translateY(-60px)',
          width: '100%'
        }}
      />
      <div
        style={{
          height: '50px',
          position: 'relative',
          top: '-240px',
          backgroundColor: 'black'
        }}
      />
    </div>
  )
}
export default TrailerVideo
