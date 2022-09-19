import React, { useRef } from 'react'
import {
  Container,
  ContainerNFT,
  ContentNFT,
  AvatarNFT,
  NameNFT,
  ContainerOption,
  AddressOwner,
  PasswordNFT,
  IconShare,
  Description,
  ButtonMoreDetails,
  ImageBlock,
  ContainerList
} from './styled'
import { ShareAltOutlined } from '@ant-design/icons'
import VirtualList from 'rc-virtual-list'
import { List } from 'antd'
import CustomLink from 'pages/Components/CustomLink'
import { validateAddress, ellipsisAddress, timestampToDisplayRelativeDate, roundingNumber, detectImageUrl, copyToClipboard } from 'common/function'
import { Router } from 'common/routes'
import { useSelector } from 'react-redux'
import { images } from 'config/images'
const TableMobile = ({ data, onClickItem, loadMore, isLoading }) => {
  const userData = useSelector((state) => state.userData)
  const messages = useSelector((state) => state.locale.messages)
  const listRef = useRef(null)
  const checkOwnerUser = (address) => {
    if (address === userData?.address) {
      Router.push(`/my-nfts`)
    } else {
      Router.push(`/user/${address}`)
    }
  }
  console.log({ data })
  const itemList = (item, index) => {
    return (
      <Container key={index} odd={index % 2 === 0}>
        <ContainerNFT>
          <AvatarNFT
            onClick={() =>
              Router.push(
                `/my-nft-detail/${item.contractAddress}/${item.nftId}`
              )
            }
            src={item.image}
          />
          <ContentNFT>
            <NameNFT textTransform>
              {item.checkCode && <ImageBlock src={images.icBlock} />}
              {item.name ?? 'Name'}
            </NameNFT>
            <div
              onClick={() => {
                checkOwnerUser(item.ownerAddress.ownerAddress)
              }}
              className='on-hover'
              style={{
                width: '90px',
                height: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4
              }}
            >
              <img
                src={
                  item.avatarOwner
                    ? detectImageUrl(item.avatarOwner)
                    : images.avatarDefault
                }
                style={{ width: 16, height: 'auto', borderRadius: '50%' }}
              />
              <br />
              <CustomLink route={'/'}>
                <AddressOwner>
                  {item.ownerAddress && item.ownerAddress.includes('0x')
                    ? ellipsisAddress(item.ownerAddress, 5, 4)
                    : item.ownerAddress}
                </AddressOwner>
              </CustomLink>
            </div>
            <Description>{`Lv: ${item.level}`}</Description>
            <Description>{`Requires: ${
              roundingNumber(item.ratio * 100) + '% of earnings'
            }`}</Description>
            <Description>{`Lending Period: ${timestampToDisplayRelativeDate(
              item.duration ?? 0
            )}`}</Description>
            {/* <CustomLink route={`/user/${item.address}`}>
              <AddressOwner>{`Owner: ${viewOwner}`}</AddressOwner>

            </CustomLink> */}
          </ContentNFT>
          <IconShare
            onClick={() => {
              copyToClipboard(
                `${window.location.origin}/my-nft-detail/${item.contractAddress}/${item.nftId}`,
                'URL is copied'
              )
            }}
          />

          {/* <ContainerOption>
            <IconShare className='MB10' />
            <ButtonMoreDetails
              onClick={() =>
                Router.push(
                  `/my-nft-detail/${item.contractAddress}/${item.nftId}`
                )
              }
            >
              {messages.common.moreDetails}
            </ButtonMoreDetails>
          </ContainerOption> */}
        </ContainerNFT>
      </Container>
    )
  }

  return (

  <>
    {data.length > 0 ? (
      <ContainerList
      // bordered
        grid={{
          xs: 1,
          sm: 1
        }}
      >
        <VirtualList data={data} ref={listRef} height={'100%'}>
          {(item, index) => <List.Item>{itemList(item, index)}</List.Item>}
        </VirtualList>
      </ContainerList>
    ) : null}
  </>)
}
export default TableMobile
