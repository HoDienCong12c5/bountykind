import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  background: #1c2029;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
`

export const SphereContainer = styled.div`
  max-height: 500px;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  overflow-y: auto;
  z-index: 10;
`

export const Sphere = styled.div`
  width: 100%;
  height: 80px;
  cursor: pointer;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  padding-left: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`

export const SphereImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-image: url("${(props) => props.image}");
  background-size: cover;
  background-position: cover;
  background-position: center;
  margin-right: 20px;
`

export const SphereInfo = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
`

export const InfoTop = styled.div`
  width: 100%;
  text-align: left;
  color: white;
  font-weight: bold;
  font-size: 15px;
`
export const InfoBottom = styled.div`
  width: 100%;
  text-align: left;
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  font-weight: bold;
`

export const ConfirmButton = styled.button`
  width: 95%;
  height: 50px;
  background: red;
  margin-left: 2.5%;
  margin-top: 40px;
  margin-bottom: 20px;
  color: white;
  font-weight: bold;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  filter: brightness(60%);
  border: none !important;
  transition: filter 0.2s ease;
  &:hover{
    filter: brightness(100%);  
  }
  background: #396afc;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #2948ff, #396afc);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #2948ff, #396afc); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`

export const Message = styled.div`
  width: 100%;
  font-size: 15px;
  max-height: 500px;
  width: 100%;
  display: flex;
  justify-content: center;  
  flex-flow: row wrap;
  overflow-y: auto;
  z-index: 10;
  padding-top: 20px;
  margin-bottom: -20px;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 1);
`

export default () => {}
