import React from 'react'
import styled from 'styled-components'
import { MediumText, NormalText } from 'pages/Components/TextSize'
import ButtonFilter from 'pages/Components/ButtonFilter'
import { ellipsisAddress, timestampToDisplayRelativeDate } from 'common/function'
import { ICON_BUTTON_ESPECIALLY, COLOR } from 'common/constants'
import moment from 'moment'
import { DivAll } from '../DivBasic'
const PropertyContainer = styled(DivAll)`
  display: flex;
  border-radius: 16px;
  flex-flow: column wrap;
`
const ListPropertyContainer = styled.div`
  gap: 16px;
  display: flex;
  flex-direction: column;
`
const Title = styled(MediumText)``
const PropertyList = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`

const PropertyItem = styled(ButtonFilter)``
const Line = styled.div`
 --color: ${COLOR.white2}; /* color */
  width: 100%;
  height: 1px;
  background: var(--color);
`
const PropertyDetails = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`
const DetailsTitle = styled.div`
color:#ffff;
`
const DetailsValue = styled(NormalText)`
  color: #c4a5f8;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

const PropertiesDetails = ({ nftDetails, children, isMarketPlace = null, isStore = null }) => {
  const checkTypeElement = (nft) => {
    let tempObject = {}
    if (isStore) {
      tempObject = {
        type: nft?.type,
        color: nft?.color
      }
    } else if (nft?.attributes?.type === 'character') {
      tempObject = nft?.attributes?.character
    } else {
      if (nft?.attributes?.type === 'item') {
        tempObject = nft?.attributes?.item
      } else {
        if (nft?.attributes?.type === 'sapphire') {
          tempObject = nft?.attributes?.sapphire
        } else {
          if (nft?.rarity !== '') {
            tempObject[nft?.rarity?.toLowerCase()] = nft?.rarity?.toLowerCase()
          } else {
            tempObject['Description'] = 'Description'
          }
        }
      }
    }

    let arrTemp = []
    for (const item in tempObject) {
      if (item === 'level') {
        arrTemp.push({
          title: `Lv. ${tempObject[item]}`,
          icon: ICON_BUTTON_ESPECIALLY[tempObject[item]]?.icon
        })
      } else {
        if (Array.isArray(tempObject[item])) {
          const temp = tempObject[item]?.map((item) => {
            arrTemp.push({
              title: item,
              icon: ICON_BUTTON_ESPECIALLY[item?.toLowerCase()]?.icon
            })
          })
        } else {
          arrTemp.push({
            title: tempObject[item],
            icon: ICON_BUTTON_ESPECIALLY[tempObject[item]?.toLowerCase()]?.icon
          })
        }
      }
    }
    return arrTemp
  }

  const roundingNumber = (amount) => {
    return Math.round((amount + Number.EPSILON) * 100) / 100
  }
  // const showDetails = nftDetails?.isSelling || nftDetails?.isRenting
  const showDetails = false
  console.log({ nftDetails })
  return (
    <PropertyContainer className='padding'>
      <ListPropertyContainer>
        <Title>PROPERTIES</Title>
        <PropertyList>
          {
            checkTypeElement(nftDetails).map((item, index) => (
              <PropertyItem
                key={item}
                noHover
                disabled
                title={item?.title}
                icon={item?.icon}
              />)
            )}
        </PropertyList>
      </ListPropertyContainer>
      { showDetails && <Line />}
      {showDetails &&
      <ListPropertyContainer>
        <Title>DETAILS</Title>
        {nftDetails?.isSelling && (
            <>
              <PropertyDetails>
                <DetailsTitle>Order ID </DetailsTitle>
                <DetailsValue>{nftDetails?.orderId}</DetailsValue>
              </PropertyDetails>
              <PropertyDetails>
                <DetailsTitle>Start Date </DetailsTitle>
                <DetailsValue>{nftDetails?.createdOrderAt ? moment(nftDetails?.createdOrderAt).format('DD/MM/YYYY hh:mm:ss A') : 'startDate'}</DetailsValue>
              </PropertyDetails>
              {!isMarketPlace &&
                <PropertyDetails>
                  <DetailsTitle>Current Price </DetailsTitle>
                  <DetailsValue>{nftDetails?.price}$</DetailsValue>
                </PropertyDetails>
              }

            </>

        )}
        {
          (nftDetails?.isRenting && nftDetails?.renterAddress) && (
              <>
                <PropertyDetails>
                  <DetailsTitle > Address applied</DetailsTitle>
                  <DetailsValue>{nftDetails.rentAddress && ellipsisAddress(nftDetails.rentAddress, 5, 4)}</DetailsValue>
                </PropertyDetails>
                <PropertyDetails>
                  <DetailsTitle> Time start scholarship </DetailsTitle>
                  <DetailsValue>{new Date(nftDetails.rentAt).toLocaleString()}</DetailsValue>
                </PropertyDetails>
                <PropertyDetails>
                  <DetailsTitle>Time end scholarship </DetailsTitle>
                  <DetailsValue>{new Date(nftDetails.rentEnd).toLocaleString()}</DetailsValue>
                </PropertyDetails>
              </>
          )
        }
        {
          (nftDetails?.isRenting && !nftDetails?.renterAddress) && (
              <>
                <PropertyDetails>
                  <DetailsTitle>Duration </DetailsTitle>
                  <DetailsValue>{nftDetails?.duration && timestampToDisplayRelativeDate(Number(nftDetails?.duration))}
                  </DetailsValue>
                </PropertyDetails>
                <PropertyDetails>
                  <DetailsTitle >Requires</DetailsTitle>
                  <DetailsValue>{roundingNumber(nftDetails.ratio * 100)}% of earnings</DetailsValue>
                </PropertyDetails>
                <PropertyDetails>
                  <DetailsTitle> Password required</DetailsTitle>
                  <DetailsValue>{nftDetails?.checkCode ? 'Yes' : 'No'}</DetailsValue>
                </PropertyDetails>

              </>
          )
        }
      </ListPropertyContainer>
      }

    </PropertyContainer>
  )
}

export default PropertiesDetails
