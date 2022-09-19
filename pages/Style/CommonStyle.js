import styled, { css } from 'styled-components'
import React from 'react'
import Media from 'react-media'

const Loading = ({ children }) => {
  const LoadingComponent = styled.div`
  display: flex;
  justify-content: center;
`
  return (
    <LoadingComponent>
      {children}
    </LoadingComponent>
  )
}

const MediaStyle = ({ rD, rM }) => {
  return (
    <>
      <Media query='(min-width: 769px)' render={() => rD()} />
      <Media query='(max-width: 768px)' render={() => rM()} />
    </>)
}

const MG = styled.div`
  ${props => css`
    margin: ${props.MT || 0}px ${props.MR || 0}px ${props.MB || 0}px ${props.ML || 0}px;
  `}
`

export {
  Loading,
  MediaStyle,
  MG
}

export default () => {}
