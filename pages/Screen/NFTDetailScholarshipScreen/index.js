/* eslint-disable react/jsx-no-target-blank */
import { Router } from 'common/routes'
import { AreaChart, XAxis, YAxis, Area, ResponsiveContainer, Tooltip } from 'recharts'
import { Spin, Row, Col, Table } from 'antd'
import { ExportOutlined, LoadingOutlined } from '@ant-design/icons'
import React, { useEffect, useState, useRef } from 'react'
import {
  numberWithCommas,
  roundingNumber,
  ellipsisAddress,
  detectTransaction,
  convertWeiToBalance
} from 'common/function'
import { images } from 'config/images'
import { orderHistory } from './orderHistorySampleData'
import MyModal from 'pages/Components/MyModal'
import {
  MainContainer,
  DetailsContainer,
  LeftDetailsContainer,
  RightDetailsContainer,
  BackContainer,
  ImageWrapper,
  NftName,
  TypeToken,
  CustomTooltip,
  BigTitle,
  BigTitleHistory,
  PropsDetails,
  Line,
  TitleInformation,
  MyButton
} from './style'
import './style.scss'
import moment from 'moment'
import GameService from 'services/gameService'
import { useSelector } from 'react-redux'
import StoreService from 'services/storeService'
import CustomLink from 'pages/Components/CustomLink'
import useOrderHistory from 'hooks/useOrderHistory'
import { isMobile } from 'react-device-detect'
import ModalRequirePassword from './ModalRequirePassword'
// import SuccessfullyModal from './Components/SuccessfullyModal'
import ConfirmModal from 'pages/Components/Modal/ConfirmModal'
import StartedModal from 'pages/Components/Modal/StartedModal'
import SuccessfullyModal from 'pages/Components/Modal/SuccessfullyModal'
import WalletConnectServices from 'controller/WalletConnect'
import Web3Services from 'controller/Web3'
import ButtonApply from 'pages/Components/ButtonApply'
import scholarshipService from 'services/scholarshipService'
function formatXAxis (tickItem) {
  return moment(tickItem).format('MM/DD')
}
const customTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <CustomTooltip>
        <p className='text'>{formatXAxis(label)}</p>
        <div className='text'>
          Price:
          <br />
          <span className='tooltip-price'>
            &nbsp;
            <p>${numberWithCommas(roundingNumber(payload[0].value, 4))}</p>
          </span>
        </div>
      </CustomTooltip>
    )
  }
  return null
}

const OrderHistory = ({ nft }) => {
  const { data, page, changePage, total, limit, isLoadingOrderHistory } = useOrderHistory(nft?.address, nft?.id)
  const column = [
    {
      title: 'Date',
      align: 'center',
      width: '15%',
      dataIndex: 'createdAt',
      render: (date) => <>{isMobile ? moment(date).format('DD/MM/YY') : moment(date).format('DD/MM/YYYY hh:mm A')}</>
    },
    {
      title: 'Price',
      width: '15%',
      dataIndex: 'jpyPrice',
      render: (data) => <span>{data} {'YU'}</span>
    },
    {
      title: 'Seller',
      width: '30%',
      dataIndex: 'sellerAddress',
      render: (text) => (
        <CustomLink route={'/'}>
          <a className='on-hover'>
            {isMobile ? ellipsisAddress(text, 3, 3) : ellipsisAddress(text, 6, 6)}
          </a>
        </CustomLink>
      )
    },
    {
      title: 'Buyer',
      width: '30%',
      dataIndex: 'buyerAddress',
      render: (text) => (
        <CustomLink route={'/'}>
          <a className='on-hover'>
            {isMobile ? ellipsisAddress(text, 3, 3) : ellipsisAddress(text, 6, 6)}
          </a>
        </CustomLink>
      )
    },
    {
      title: 'Txs',
      width: '10%',
      dataIndex: 'hash',
      render: (text) => (
        <a href={detectTransaction(text)} target='_blank' ><ExportOutlined /></a>
      )
    }
  ]

  return (
    <DetailsContainer >
      <BigTitleHistory>
          List History
      </BigTitleHistory>
      <Table
        className='tb-history'
        style={{ width: '100%' }}
        columns={column}
        loading={isLoadingOrderHistory}
        dataSource={data}
        pagination={
          {
            current: page,
            onChange: newPage => {
              changePage(newPage)
            },
            total: total,
            pageSize: limit
          }}
      />
    </DetailsContainer>
  )
}

const NFTDetailScholarshipScreen = (props) => {
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 40, color: 'white' }} spin />
  )
  // state
  const [nftDetails, setNftDetails] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [characterData, setCharacterData] = useState(null)
  const myModal = useRef(null)
  const [typeNFT, setTypeNFT] = useState(null)
  const [nftDetailsScholarship, setNftDetailsScholarship] = useState(null)

  useEffect(() => {
    const getNftDetails = async () => {
      setLoading(true)
      const _nftDetails = await GameService.getInforDetailsNFT(
        props.nftAddress,
        props.id
      )
      if (_nftDetails) {
        console.log({ _nftDetails })
        setNftDetails(_nftDetails?.data)
        setTypeNFT(_nftDetails?.data.attributes.type)
      }

      setLoading(false)
    }
    const getNftDetailsNew = async () => {
      const _nftDetails = await StoreService.getNFT(props.nftAddress, props.id)
      setNftDetails(_nftDetails?.data)
      setTypeNFT(_nftDetails?.data.attributes.type)
    }
    if (!nftDetails) {
      getNftDetails()
    } else {
      if (nftDetails?.isSelling) {
        getNftDetailsNew()
      }
    }
  }, [nftDetails?.isSelling])
  useEffect(() => {
    if (nftDetails?.isRenting) {
      scholarshipService.getItemScholarshipById(nftDetails.contractAddress, nftDetails.nftId).then(res => {
        if (res && res.data) {
          setNftDetailsScholarship(res.data)
        }
      }).catch(err => { })
    }
  }, [nftDetails])
  useEffect(() => {
    const getCharacterItemsInfo = async () => {
      let res = null
      if (typeNFT === 'character') {
        res = await GameService.getCharactersItemData(
          props.nftAddress,
          props.id
        )
      } else if (typeNFT === 'item') {
        res = await GameService.getItemInfoData(
          props.nftAddress,
          props.id
        )
      }

      if (res && res?.data) {
        setCharacterData(res?.data)
      }
    }
    getCharacterItemsInfo()
  }, [typeNFT])

  const propsNFTDetails = (
    title1,
    title2,
    content1,
    content2,
    isAnimation = false
  ) => {
    return (
      <Row>
        <Col span={12}>
          <PropsDetails>
            {title1} : <div style={{ marginLeft: 10 }}>{content1}</div>
          </PropsDetails>
        </Col>
        <Col span={12}>
          <PropsDetails>
            {title2} : <div style={{ marginLeft: 10 }}>{content2}</div>
          </PropsDetails>
        </Col>
      </Row>
    )
  }

  const renderMarket = () => {
    return (
      nftDetails &&
      !isLoading && (
        <DetailsContainer>
          <BigTitle>Market cap</BigTitle>
          <ResponsiveContainer width='100%' height={300}>
            <AreaChart
              data={orderHistory.data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='50%' stopColor={'rgba(221, 94, 228, 0.8)'} stopOpacity={0.7} />
                  <stop offset='95%' stopColor={'rgba(32, 231, 249, 0.8)'} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey={'createdAt'}
                tickFormatter={formatXAxis}
                tick={{ fontSize: 12 }}
                stroke='white'
              />
              <YAxis tick={{ fontSize: 12 }} stroke='white' />
              <Tooltip content={customTooltip} />
              {/* <CartesianGrid verticalFill={'#111111'} horizontal={false} /> */}
              <Area
                name='Price JPY'
                type='monotone'
                dataKey={'jpyPrice'}
                stroke={'rgba(221, 94, 228,1)'}

                fillOpacity={1}
                fill='url(#colorUv)'
              />
            </AreaChart>
          </ResponsiveContainer>
        </DetailsContainer>
      )
    )
  }
  const renderRightDetailNFT = () => {
    return (
      <RightDetailsContainer>
        <TypeToken>
          <img
            src={nftDetails?.image}
            style={{
              height: 30,
              width: 30,
              marginRight: 8
            }}
          />
          {nftDetails.attributes.type}
        </TypeToken>
        <NftName>{nftDetails.name}</NftName>
        {characterData && <TitleInformation>Information</TitleInformation> }
        {characterData && propsNFTDetails('ATK', 'HP', characterData?.atk ?? '~', characterData?.hp ?? '~', true)}
        {characterData && propsNFTDetails('DEF', 'EXP', characterData?.def ?? '~', characterData?.exp ?? '~', true)}
        {characterData && propsNFTDetails('SPEED', 'LEVEL', characterData?.speed ?? '~', characterData?.level ?? '~', true)}
        <Line marginBottom={'20px'} />

        <ButtonApply nftDetails={nftDetails} nftDetailsScholarship={nftDetailsScholarship} />

      </RightDetailsContainer>
    )
  }

  return (
    <div className='full-container'>
      <MainContainer>
        <BackContainer>
          <button
            onClick={() => {
              Router.back()
            }}
          >
            <img src={images.icBack} />
            Back
          </button>
        </BackContainer>
        {isLoading &&
        <DetailsContainer>
          <Spin indicator={antIcon} />
        </DetailsContainer>
        }
        {nftDetails && !isLoading &&
        <DetailsContainer>
          <LeftDetailsContainer>
            <ImageWrapper>
              <img src={nftDetails.image} />
            </ImageWrapper>
          </LeftDetailsContainer>
          {renderRightDetailNFT()}
        </DetailsContainer>
        }
        {nftDetails && <OrderHistory nft={nftDetails} />}
        {renderMarket()}
        <MyModal ref={myModal} />
      </MainContainer>
    </div>
  )
}
NFTDetailScholarshipScreen.getInitialProps = async ({ query }) => {
  const { id, nftAddress } = query
  return { id, nftAddress }
}
export default NFTDetailScholarshipScreen
