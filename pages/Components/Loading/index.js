import React from 'react'
import styled, { css } from 'styled-components'
import { images } from 'config/images'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
  ${props => css`
    min-height: ${props.withWrapper ? '100vh' : 'unset'};
    flex: ${props.fitContainer ? '1' : 'none'};
    min-width: ${props.fitContainer ? '100%' : '100vw'};
  `}

`

const Loading = ({ withWrapper = true, fitContainer = false, styles }) => {
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 40, color: 'white' }} spin />
  )
  return (
    <LoadingWrapper
      style={styles}
      withWrapper={withWrapper}
      fitContainer={fitContainer}
    >
      {/* <img src={images.icLoading} width={70} alt='Loading' /> */}
      <Spin indicator={antIcon} />
    </LoadingWrapper>
  )
}

export default Loading
