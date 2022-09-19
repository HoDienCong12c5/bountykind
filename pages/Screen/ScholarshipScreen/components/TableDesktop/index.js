
import CustomLink from 'pages/Components/CustomLink'
import { ellipsisAddress, detectImageUrl, timestampToDisplayRelativeDate, copyToClipboard } from 'common/function'
import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import './style.scss'
import { ShareAltOutlined } from '@ant-design/icons'
import { Router } from 'common/routes'

import EmptyData from 'pages/Components/EmptyData'
import Loading from 'pages/Components/Loading'
import { useSelector } from 'react-redux'
import { DetailsContainer
  , ButtonMoreDetails,
  ImageBlock,
  ButtonShare } from './styled.js'
import { images } from 'config/images'
import { NormalText } from 'pages/Components/TextSize'
import { AddressOwner } from '../TableMobile/styled'
const TableDesktop = ({ data, isLoading, loadMore, onLoadMoreData, pageSize }) => {
  const userData = useSelector(state => state.userData)
  const messages = useSelector(state => state.locale.messages)
  const roundingNumber = (amount) => {
    return Math.round((amount + Number.EPSILON) * 100) / 100
  }
  const checkOwnerUser = (address) => {
    if (address === userData?.address) {
      Router.push(`/my-nfts`)
    } else {
      Router.push(`/user/${address}`)
    }
  }

  const column = [
    {
      title: '#',
      dataIndex: 'index',
      render: (text, record, index) => (
        <NormalText className='number-rank'>
          {index + 1}
        </NormalText>
      )

    },
    {
      title: '',
      dataIndex: 'image',
      render: (text, record) => (
        <div className='on-hover' style={{ width: '100px', height: 'auto', display: 'flex' }} >
          <img src={text} style={{ maxWidth: ' 100%', height: 'auto' }}
            onClick={() => { Router.push(`/my-nft-detail/${record.contractAddress}/${record.nftId}`) }}
          />
          <ButtonShare onClick={() => {
            copyToClipboard(`${window.location.origin}/my-nft-detail/${record.contractAddress}/${record.nftId}`, 'URL is copied')
          }} />
        </div>

      )
    },
    // {
    //   title: 'User',
    //   dataIndex: 'contractAddress',
    //   render: (text) => (
    //     <CustomLink route={'/'}>
    //       <a className='on-hover'>

    //         {(text && text.includes('0x')) ? ellipsisAddress(text, 10, 10) : text}
    //       </a>
    //     </CustomLink>
    //   )
    // },
    {
      title: 'Level',
      dataIndex: 'level',
      render: (text) => (
        <NormalText>
          {'Lv. ' + text}
        </NormalText>
      )
    },
    {
      title: messages.scholarship.requires,
      dataIndex: 'ratio',
      render: (text) => (

        <div>

          <NormalText>{roundingNumber(text * 100) + '% of earnings'}</NormalText>
        </div>
      )
    },
    {
      title: messages.scholarship.owner,
      dataIndex: 'avatar',
      align: 'center',
      render: (text, record) => (
        <div
          onClick={() => { checkOwnerUser(record.ownerAddress) }} className='on-hover'
          style={{ width: '90px', height: 'auto', margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}
        >
          <img src={record.avatarOwner ? detectImageUrl(record.avatarOwner) : images.avatarDefault} style={{ width: 25, height: 'auto', borderRadius: '50%' }}

          />
          <br />
          <CustomLink route={'/'}>
            <AddressOwner >
              {(record.ownerAddress && record.ownerAddress.includes('0x')) ? ellipsisAddress(record.ownerAddress, 5, 4) : text}
            </AddressOwner>
          </CustomLink>

        </div>
      )
    },
    {
      title: messages.scholarship.lendingPeriod,
      dataIndex: 'duration',
      render: (text) => (

        <div>
          <NormalText>{timestampToDisplayRelativeDate(text)}</NormalText>

        </div>
      )
    },
    {
      title: messages.scholarship.passwordRequired,
      dataIndex: 'checkCode',
      render: (text) => (
        <ImageBlock src={text && images.icBlock} />
      )
    },
    {
      title: '',
      dataIndex: 'address',
      render: (text, record) => (
        <>
          {/* <ButtonApply isRoutePage funcAfterClose={getListScholarship} nftDetailsScholarship={record} nftDetails={{ ...record, address: record.contractAddress, id: record.nftId }}>
            Apply
          </ButtonApply> */}
          <ButtonMoreDetails type={3} onClick={() => Router.push(`/my-nft-detail/${record.contractAddress}/${record.nftId}`)}>
            {messages.common.moreDetails}
          </ButtonMoreDetails>
        </>

      )
    }
  ]
  return (
    <>{

      isLoading ? <Loading fitContainer withWrapper /> : <>

        {data && data?.length > 0 ? <>
          <DetailsContainer >
            <Table
              className='tb-history'
              style={{ width: '100%' }}
              columns={column}
              // loading={isLoadingOrderHistory}
              dataSource={data}
              pagination={false}
            />
          </DetailsContainer>
        </>

          : <EmptyData />
        }
      </>
    }

    </>

  )
}
export default TableDesktop
