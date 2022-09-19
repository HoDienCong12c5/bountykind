import React, { useRef, useState, useEffect } from 'react'
import { images } from 'config/images'
import './style.scss'

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter (ref, parentRef, callback) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside (event) {
      if (ref.current && !ref.current.contains(event.target) && !parentRef.current.contains(event.target)) {
        callback()
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}

const Popover = (props) => {
  const { className, parentRef, onClose, title, content } = props
  const wrapperRef = useRef(null)
  const [isShow, setShow] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, 100)
  }, [])

  useOutsideAlerter(wrapperRef, parentRef, onClose)

  return (
    <div ref={wrapperRef} className={`popover ${className || ''}` + (isShow ? ' show' : '')}>
      <div className='popover-header'>
        <h3 className='popover-title'>{title}</h3>
        <img src={images.icClose} onClick={onClose} />
      </div>
      <div className='popover-content'>
        {content}
      </div>
    </div>
  )
}

export default Popover
