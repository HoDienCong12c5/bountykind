import React from 'react'
import {
  NFTDetails,
  AvatarNFT,
  TypeToken,
  NameToken,
  Level,
  NFTContainer,
  StatusBoxCustom,
  StatusBoxBasic
} from './styled'
import StatusBox from 'pages/Components/Marketplace/StatusBox'
const urlImgFake = 'https://static.remove.bg/remove-bg-web/588fbfdd2324490a4329d4ad22d1bd436e1d384a/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png'
const TYPE_ITEM = {
  myNft: 'myNft',
  character: 'character',
  scholarship: 'scholarship'
}

const ItemList = ({ data, onClick, typeItem = 'myNft', searchNFT, userAddress }) => {
  const typeView = typeItem === TYPE_ITEM.myNft
    ? TYPE_ITEM.myNft
    : typeItem === TYPE_ITEM.character
      ? TYPE_ITEM.character : TYPE_ITEM.scholarship
  const checkNFT = (item) => {
    if (typeView === TYPE_ITEM.character) {
      return item.nftId || false
    } else {
      return item.id || false
    }
  }
  return (
    data.map((item, index) => {
      return (
        searchNFT === '' ? (
          <NFTDetails onClick={() => onClick(item)} isCharacter={checkNFT(item)}>
            {
              item?.selling && <StatusBoxCustom style={{ marginLeft: 1000 }}>Selling</StatusBoxCustom>
            }
            {
              typeView === TYPE_ITEM.character ? item.nftId : item.id && <div style={{ width: '100%', textAlign: 'center', marginBottom: 10 }}>
              ID : {typeView === TYPE_ITEM.character ? item.nftId : item.id}
              </div>
            }

            <AvatarNFT src={item.image} />
            <TypeToken >
              <div >
                <img src={urlImgFake} alt='avatar' style={{ height: 25, width: 25 }} />
                Ultra
              </div>

            </TypeToken>
            <NameToken>
              { item.name}
            </NameToken>
            <Level >
              {`Lv ${item.level ?? 'default 1'}`}
            </Level>

          </NFTDetails>
        ) : null
      )
    })
  )
}

export default ItemList
