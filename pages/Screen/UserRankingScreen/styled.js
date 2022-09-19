import { Row, Tabs } from 'antd'

const { default: styled } = require('styled-components')

const TitleStoreGame = styled.p`
  text-transform: uppercase;
  font-size: 2.5rem;
  text-align: center;
  margin-top: 20px;
  color: gray;
  @media screen and (max-width: 768px) {
    font-size: 2rem;
  }
`
const UserTabs = styled(Tabs)`
  width: 100%;
  margin: 0px auto;
  max-width: 1550px;
  .ant-tabs-nav-container {
    text-align: center;
  }
`
const ContentRanking = styled.div` 
  padding: 10px;
  margin: 20px 0;
  width: 100%;
  max-width: 800px;
  margin: 0px auto;
  border: 1px solid gray;
`
const RowRanking = styled(Row)`
 padding: 10px;
 border-bottom: 1px solid gray;
`
const Container = styled.div`
`
export { TitleStoreGame, UserTabs, Container, ContentRanking, RowRanking }
export default () => {}
