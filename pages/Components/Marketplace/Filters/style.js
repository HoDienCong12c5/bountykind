import styled from 'styled-components'
import { NormalText, TitleText } from 'pages/Components/TextSize'
import { DivAll } from 'pages/Components/DivBasic'
import { COLOR } from 'common/constants'
export const FiltersContainer = styled(DivAll)`
  margin-top: 10px;
  width: ${(props) => props.width};
  display: flex;
  flex-flow: column wrap;
  background: black;
  padding-top: 10px;
  animation: onChangeHeight 0.2s ease;
  height: max-content;
  padding-bottom: 10px;
  margin-bottom: 26px;
  .ant-collapse-icon-position-left {
    border: none !important;
  }
  .ant-collapse-content {
    background: ${COLOR.white2};
    border: none !important;
  }
  .ant-collapse-content-box {
    background: black !important;
    padding: 0px;
  }
  .ant-collapse-header {
    background: black !important;
    color: white !important;
    font-weight: bold !important;
    font-size: 16px !important;
  }
  min-width: 200px;
`

export const HeaderFilter = styled(TitleText)`
  width: 100%;
  padding-bottom: 10px;
  display: flex;
  flex-flow: row wrap;
  align-items: baseline;
  justify-content: space-between;
  color: white;
  padding-left: 15px;
  padding-right: 18px;
  font-weight: bold;
  letter-spacing: 0.5px;
  border-bottom: 1px solid ${COLOR.white2};
`

export const ResetAllFiltersBTN = styled(NormalText)`
  background: transparent;
  font-size: 14px;
  color: white;
  cursor: pointer;
  font-weight: bold;
  border: none;
  outline: none;
  filter: brightness(90%);
  &:hover {
    filter: brightness(110%);
  }
`

export default () => {}
