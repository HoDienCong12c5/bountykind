import styled from 'styled-components'

export const NFTContainer = styled.div`
  width: 100%;
  position: relative;
  cursor: pointer;
  user-select: none;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  background: #010A1D;
  height: 100%;
`

export const NFTImage = styled.img`
  width: 100%;
  object-fit: cover;
  max-height: 300px;
`

export const BlackBackground = styled.div`
  width: 100%;
  background: #010A1D;
  padding: 0px 10px 20px 10px;
  display: flex;
  flex-flow: column;
  gap: 10px;
`

export const NFTName = styled.div`
  width: calc(50% + 40px);
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  text-transform: uppercase;
  color: #ffffff;
  padding-left: 6%;
  padding-right: 10px;
  width: 100%;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
          line-clamp: 2; 
  -webkit-box-orient: vertical;
  @media screen and (max-width: 1200px) {
    font-size: 1.5vw;
  }
  @media screen and (max-width: 768px) {
    font-size: 3vw;
  }
  @media screen and (max-width: 575px) {
    font-size: 4vw;
  }
`

export const NFTId = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  padding-left: 6%;
  font-size: 0.8vw;
  line-height: 19px;
  color: #ffffff;
  width: 100%;
  @media screen and (max-width: 1300px) {
    font-size: 1.4vw;
  }
  @media screen and (max-width: 768px) {
    font-size: 2.5vw;
  }
  @media screen and (max-width: 575px) {
    font-size: 4vw;
  }
`
export default () => {}
