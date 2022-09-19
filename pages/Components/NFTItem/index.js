import React from 'react'
import { images } from 'config/images'
import { detectImageUrl } from 'common/function'
import StatusBox from 'pages/Components/StatusBox'
import {
  NFTContainer,
  BlackBackground,
  NFTImage,
  NFTName,
  NFTId
} from './style'
import { useSelector } from 'react-redux'

const NFTItem = (props) => {
  const { onClick, dataItem } = props
  const { messages } = useSelector(state => state.locale)
  const formatName = () => {
    return dataItem?.name.replace(' ', '<br />')
  }
  return (
    <NFTContainer onClick={onClick} image={images.blackBackground}>
      {dataItem.selling || dataItem.sellingHash ? <StatusBox>{messages.nft.waitingForBuyer}</StatusBox> : null}
      <NFTImage src={detectImageUrl(dataItem?.image)} />
      <BlackBackground image={images.blackBackground}>
        <NFTName dangerouslySetInnerHTML={{ __html: formatName() }} />
        <NFTId>#{dataItem?.id}</NFTId>
      </BlackBackground>
    </NFTContainer>
  )
}

export default NFTItem
