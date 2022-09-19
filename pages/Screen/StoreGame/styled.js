import { Input, Select } from 'antd'
import styled from 'styled-components'
import { COLOR } from 'common/constants'
// styled component
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
const MainContainer = styled.div`
  margin: 0px auto;
  width: 1450px;
  display: flex;
  justify-content: space-between;
`
const InputSearch = styled(Input.Search)`
  width: 79%;
  border-radius: 5px;
`
const RightContent = styled.div`
  width: 18%;
`
const LeftContent = styled.div`
  width: 80%;
`
const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
const SelectFilter = styled(Select)`
  width: 20%;
`
const List = styled.ul`
--color: ${COLOR.white2}; /* color */
  width: 100%;
  border: 1px solid var(--color);
  border-radius: 5px;
`
const ListItem = styled.li`
  padding: 15px;
  padding-bottom: 0px;
`
const ListItemHeader = styled.li`
--color: ${COLOR.white2};
  padding: 15px;
  text-transform: uppercase;
  font-weight: bold;
  color: lightblue;
  border-bottom: 1px solid  var(--color);
`
const ContainerItemList = styled.div`
--color: ${COLOR.white2};
  display: flex;
  align-items: center;
  border-bottom: 1px solid  var(--color);
  padding-bottom: 15px;
`
const ListItemContent = styled.div`
  margin-left: 10px;
`
const TitleItemList = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: lightblue;
`

const ValueItemList = styled.div`
  font-size: 1rem;
`
const CardItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 0 0 10px 5px;
  height: 250px;
  img{
    height: 50%;
    max-width: 120px;
  }
`
const PriceContainer = styled.div`
    display: flex;
    color: green;
`
export {
  TitleStoreGame,
  List,
  ListItem,
  ContainerItemList,
  TitleItemList,
  ValueItemList,
  ListItemHeader,
  SelectFilter,
  MainContainer,
  LeftContent,
  RightContent,
  InputSearch,
  FilterContainer,
  ListItemContent,
  CardItem,
  PriceContainer
}
export default () => { }
