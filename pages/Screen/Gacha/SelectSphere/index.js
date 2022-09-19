import React, { useEffect, useState } from 'react'
import {
  Container,
  SphereContainer,
  Sphere,
  SphereImage,
  SphereInfo,
  InfoTop,
  InfoBottom,
  ConfirmButton,
  Message
} from './style'
import '../style.scss'
import { Router } from 'common/routes'
import MarketplaceButton from 'pages/Components/Marketplace/Button'
import { Checkbox } from 'pages/Components/Marketplace/Filter/style'
import { images } from 'config/images'

const SelectSphere = ({ data, onConfirm }) => {
  const [selectedSphere, setSelectedSphere] = useState(null)

  useEffect(() => {
    if (data.spheres?.length > 0) {
      setSelectedSphere(data.spheres[0])
    }
  }, [])

  const upperCaseFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.substring(1, text.length)
  }

  return (
    <Container>
      {data.spheres?.length > 0 && selectedSphere && (
        <SphereContainer>
          {data.spheres.map((sphere) => (
            <Sphere
              key={sphere._id}
              onClick={() => {
                setSelectedSphere(sphere)
              }}
              className={
                selectedSphere.baseKey === sphere.baseKey ? 'selected' : 'not-selected'
              }
            >
              <Checkbox
                style={{ marginRight: '20px' }}
                className={
                  selectedSphere.baseKey === sphere.baseKey ? 'selected' : 'not-selected'
                }>
                <img src={images.icCheckmark} />
              </Checkbox>
              <SphereImage image={sphere.image} />
              <SphereInfo>
                <InfoTop>{upperCaseFirstLetter(sphere.baseKey)}</InfoTop>
                <InfoBottom>Amount: {sphere.total}</InfoBottom>
              </SphereInfo>
            </Sphere>
          ))}
        </SphereContainer>
      )}
      {data.spheres?.length > 0 && (
        <MarketplaceButton
          width={'95%'}
          style={{ margin: '20px auto 10px auto' }}
          onClick={() => {
            onConfirm({ ...data, selectedSphere })
          }}
        >
          Select
        </MarketplaceButton>
      )}
      {(data.spheres.length === 0) | !data.spheres ? (
        <>
          <Message>You don't have any sphire. Go to store to buy more</Message>
          <MarketplaceButton
            width='95%'
            style={{ margin: '40px auto 20px auto' }}
            onClick={() => {
              Router.pushRoute(`/store?type=${data.type}`)
            }}
          >
            Go to store
          </MarketplaceButton>
        </>
      ) : <></>}
    </Container>
  )
}

export default SelectSphere
