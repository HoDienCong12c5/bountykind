import React from 'react'
import { detectImageUrl } from 'common/function'
import styled from 'styled-components'
import MyButton from 'pages/Components/MyButton'
const ContainerGiftNFT = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 15px;
  justify-content: center;
  align-items: center;
  .ant-modal-body{
    padding: 0;
  }

`
const GiftNFTDetails = styled.div`
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 10px;
  border-radius: 5px;
  width: 200px;
`
const Title = styled.span` 
    font-size: 18px;
    font-weight: bold;
    color:;'black';
    text-align: center;
    margin-bottom: 30px;
    background-color: rgba(255, 255, 255, 0.7);

`
const ImgNFT = styled.div`
    width: 180px;
    height: 180px;
    // background-image: url(${(props) => detectImageUrl(props.src)});
    background-image: url(${(props) => props.src});
    background-size: contain;
    text-align: center;
`
const NameNFT = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: black;
  margin-top: 10px;
  text-align: center;
`
const ButtonClose = styled(MyButton)`
  margin-top: 40px;
  width: 150px;
`

const GiftNFT = ({ data, success }) => {
  return (
    <>
      {/* <Title >
        You received Gift NFT
        </Title> */}
      <ContainerGiftNFT>
        {data?.length > 0 &&
          data.map((item, index) => (
            <GiftNFTDetails key={index}>
              <ImgNFT src={item.data.image} />
              <NameNFT>{item.data.name}</NameNFT>
            </GiftNFTDetails>
          ))}
      </ContainerGiftNFT>
      <div style={{ textAlign: 'center' }}>
        <ButtonClose onClick={success}>Success</ButtonClose>
      </div>
    </>
  )
}

export default GiftNFT
