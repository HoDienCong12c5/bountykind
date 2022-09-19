import styled from 'styled-components'
import React from 'react'
import { images } from 'config/images'
const BlogContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center; 
  &:hover {
    cursor: pointer;
    color: #fff;
  }
  &.isSelected {
    color: #fff;
  }
`
const BlogTitle = styled.div`
  font-size: 13px;
  color: #fff;
  opacity: 0.6;
  &:hover {
    opacity: 1;

  }
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`
const BlogIcon = styled.img`
  width: 18px;
  height: 18px;
`
const OptionPage = ({
  title,
  onClick,
  isSelect = false,
  isEspecially = false
}) => {
  isSelect = false
  return !isEspecially ? (
    <BlogContainer className={isSelect && 'isSelected'} onClick={onClick}>
      <BlogIcon
        src={
          isSelect
            ? images.home.iconLeftNamePage
            : images.home.iconUnSelectLeftBtn
        }
      />
      <BlogTitle>{title}</BlogTitle>
    </BlogContainer>
  ) : (
    <BlogContainer className={isSelect && 'isSelected'} onClick={onClick}>

      <BlogTitle> 2021 © Bountykinds. All rights reserved.</BlogTitle>

    </BlogContainer>
  )
}
export default OptionPage
