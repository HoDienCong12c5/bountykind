import React from 'react'
import styled from 'styled-components'
import { TitleText, MediumText, NormalText } from 'pages/Components/TextSize'
import { images } from 'config/images'
import { DivAll } from '../DivBasic'
import { COLOR } from 'common/constants'
import {
  detectImageUrl,
  ellipsisAddress,
  roundingNumber,
  timestampToDisplayRelativeDate
} from 'common/function'
import moment from 'moment'
import { AvartarSeller } from 'pages/Screen/Marketplace/Components/NftDetails/style'
import { useSelector } from 'react-redux'
import { Router } from 'common/routes'
import { Case, Default, Switch } from 'react-if'

const StatContainer = styled(DivAll)`
  display: flex;
  border-radius: 16px;
  height: 100%;
  width: 100%;
  flex-flow: column wrap;
  display: flex;
`
const Title = styled(MediumText)`
  transform: uppercase;
`
const Description = styled.div`
  color: #ffff;
`
const Line = styled.div`
  --color: ${COLOR.white2}; /* color */
  width: 100%;
  height: 1px;
  background: var(--color);
`
const ContainerFist = styled.div`
  display: inline-flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`
const Left = styled.div`
  width: 38%;
  min-width: 300px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const Right = styled.div`
  border-left: 1px solid ${COLOR.white2};
  max-width: 61%;
  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    border-top: 1px solid ${COLOR.white2};
    border-left: none;
  }
`
const ContentFistLeft = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;


 
`
const ContainerSecond = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
const PropertyDetails = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`
const DetailsTitle = styled.div`
  color: #ffff;
`
const DetailsValue = styled.div`
  color: #c4a5f8;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

const OwnerTitle = styled.div`
  font-weight: bold;
  text-transform: capitalize;
`
const OwnerName = styled.div`
  font-weight: bold;
  color: #c4a5f8;
  margin-left: 10px;
  &.link {
    cursor: pointer;f
    &:hover {
      color: #1877f2;
    }
  }
`
const Owner = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`
const ContainerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
const ContainerOderStartDate = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 16px;
`
const SellerContainer = styled.div`
display: flex;
`
const AboutNft = ({
  nftDetails,
  description = '',
  children,
  titleSecond = 'About',
  titleFistLeft = 'Details',
  titleFistRight = 'Comment',
  isMarketPlace = null
}) => {
  const userData = useSelector((state) => state.userData)
  const goToUserPage = () => {
    if (nftDetails.ownerAddress === userData?.address) {
      Router.pushRoute('/my-nfts')
    } else {
      Router.pushRoute(`/user/${nftDetails.ownerAddress}`)
    }
  }
  const showDetails = nftDetails?.isSelling || nftDetails?.isRenting

  return (
    <StatContainer >
      {showDetails && (
        <ContainerFist >
          <Left className='padding'>
            <Title>{titleFistLeft?.toUpperCase()}</Title>
            <ContentFistLeft>
              <Switch>
                <Case
                  condition={nftDetails?.isRenting && nftDetails?.renterAddress}
                >
                  <ContainerInfo>
                    <PropertyDetails>
                      <DetailsTitle>Address applied </DetailsTitle>
                      <DetailsValue>
                        {nftDetails.rentAddress &&
                          ellipsisAddress(nftDetails.rentAddress, 5, 4)}
                      </DetailsValue>
                    </PropertyDetails>
                    <PropertyDetails>
                      <DetailsTitle>Time start scholarship </DetailsTitle>
                      <DetailsValue>
                        {new Date(nftDetails.rentAt).toLocaleString()}
                      </DetailsValue>
                    </PropertyDetails>
                    <PropertyDetails>
                      <DetailsTitle>Time end scholarship </DetailsTitle>
                      <DetailsValue>
                        {new Date(nftDetails.rentEnd).toLocaleString()}
                      </DetailsValue>
                    </PropertyDetails>
                  </ContainerInfo>
                </Case>
                <Case
                  condition={
                    nftDetails?.isRenting && !nftDetails?.renterAddress
                  }
                >
                  <>
                    <PropertyDetails>
                      <DetailsTitle>Duration </DetailsTitle>
                      <DetailsValue>
                        {nftDetails?.duration &&
                          timestampToDisplayRelativeDate(
                            Number(nftDetails?.duration)
                          )}
                      </DetailsValue>
                    </PropertyDetails>
                    <PropertyDetails>
                      <DetailsTitle>Requires</DetailsTitle>
                      <DetailsValue>
                        {roundingNumber(nftDetails.ratio * 100)}% of earnings
                      </DetailsValue>
                    </PropertyDetails>
                    <PropertyDetails>
                      <DetailsTitle> Password required</DetailsTitle>
                      <DetailsValue>
                        {nftDetails?.checkCode ? 'Yes' : 'No'}
                      </DetailsValue>
                    </PropertyDetails>
                  </>
                </Case>
                <Case
                  condition={nftDetails?.isSelling && !nftDetails?.isRenting}
                >
                  <ContainerInfo>
                    {isMarketPlace && (
                      <Owner>
                        <OwnerTitle>Seller </OwnerTitle>

                        <SellerContainer>
                          <AvartarSeller
                            src={
                              nftDetails?.avatarOwner
                                ? detectImageUrl(nftDetails.avatarOwner)
                                : images.avatarDefault
                            }
                          />
                          <OwnerName
                            onClick={() => goToUserPage()}
                            className='link'
                          >
                            {nftDetails?.sellerName ??
                              ellipsisAddress(nftDetails.ownerAddress, 5, 4)}
                          </OwnerName>
                        </SellerContainer>
                      </Owner>
                    )}

                    <PropertyDetails>
                      <DetailsTitle>Order ID </DetailsTitle>
                      <DetailsValue>{nftDetails?.orderId}</DetailsValue>
                    </PropertyDetails>
                    <PropertyDetails>
                      <DetailsTitle>Start Date </DetailsTitle>
                      <DetailsValue>
                        {nftDetails?.createdOrderAt
                          ? moment(nftDetails?.createdOrderAt).format(
                            'DD/MM/YYYY hh:mm:ss A'
                          )
                          : 'startDate'}
                      </DetailsValue>
                    </PropertyDetails>

                    {!isMarketPlace && (
                      <PropertyDetails>
                        <DetailsTitle>Current Price </DetailsTitle>
                        <DetailsValue>{nftDetails?.price}$</DetailsValue>
                      </PropertyDetails>
                    )}
                  </ContainerInfo>
                </Case>
                <Default>
                  This will be displayed if no Case have matching condition
                </Default>
              </Switch>
            </ContentFistLeft>
          </Left>
          <Right className='padding'>
            <Title>{titleFistRight?.toUpperCase()}</Title>
            <ContentFistLeft />
          </Right>
        </ContainerFist>
      )}

      {showDetails && <Line />}
      <ContainerSecond className='padding'>
        <Title>{titleSecond?.toUpperCase()}</Title>
        <Description>
          {description}
          {children}
        </Description>
      </ContainerSecond>
    </StatContainer>
  )
}

export default AboutNft
