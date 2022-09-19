import React, { useState } from 'react'
import NFT3D from '../NFT3D'
import { images } from 'config/images'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
const ViewNFT = ({
  nftDetails,
  status = null
}) => {
  const messages = useSelector((state) => state.locale.messages)
  const [view3D, setView3D] = useState(false)

  return (
    <ImageWrapper>
      {!view3D && status && <StatusMyNFT>{status}</StatusMyNFT>}
      <ImageBorder draggable={false} src={images.home.borderCardFooter} />
      {view3D ? (
        <NFT3D nftId={nftDetails?.nftId}
          close3D={() => { setView3D(false) }}
        />
      ) : (
        <NFT2D>
          <ContainerImageNft>
            <ImageNft draggable={false} src={nftDetails.image} />
          </ContainerImageNft>

          <TxtClickModel onClick={() => { setView3D(true) }}>
            {messages.common.view3D}
          </TxtClickModel>
        </NFT2D>
      )}
    </ImageWrapper>
  )
}

export default ViewNFT

export const ImageWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  position: relative;
  flex-flow: column wrap;
  border-radius: 16px;
`
const ImageBorder = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  /* object-fit: cover; */
`
const NFT2D = styled.div`
  text-align: center;
  display: flex;
  width: 100%;
  height: 100%;
  flex-flow: column wrap;
  justify-content: space-around;
`
const ContainerImageNft = styled.div`
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    height: 80%;
  }
`

const ImageNft = styled.img`
  margin-top: 16px;
  max-height: 100%;
  max-width: 49%;
  @media screen and (max-width: 768px) {
    /* max-width: 80%; */
    max-height: 100%;
  }
`
const TxtClickModel = styled.div`
  padding: 12px 0;
  color: #c4a5f8;
  cursor: pointer;
  z-index: 10;
`
const StatusMyNFT = styled.div`
  width: 'max-content';
  text-align: 'center';
  padding: 0px 5px 0px 5px;
  background: #bc4e9c; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    rgba(221, 94, 228, 1),
    rgba(32, 231, 249, 1)
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    rgba(221, 94, 228, 1),
    rgba(32, 231, 249, 1)
  ) !important; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  filter: brightness(85%);
  padding: 0px 12px;
  height: 30px;
  position: absolute;
  top: -5px;
  z-index: 10;
`
