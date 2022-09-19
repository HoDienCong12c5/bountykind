import React from 'react'
import { images } from 'config/images'
import { Container } from './style'

const Empty = ({ emptyText = '' }) => {
  return (
    <Container>
      {emptyText}
    </Container>
  )
}

export default Empty
