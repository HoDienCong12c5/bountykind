import styled from 'styled-components'
import { Collapse } from 'antd'
import { COLOR } from 'common/constants'
export const CollapseFilter = styled(Collapse)`
  .ant-collapse-item {
    --color: ${COLOR.white2};
    border-bottom: 1px solid var( --color);
  }
  &:last-child {
    border-bottom: 0px solid var( --color) !important;
    .ant-collapse-item {
      border-bottom: 0px solid var( --color);
    }
  }

`
export const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: ${props => props.flexDirection} wrap;
  gap: 10px;
  padding: 10px 16px 25px 16px;
`

export const PanelHeader = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  text-transform: uppercase;
  button {
    background: transparent;
    cursor: pointer;
    border: none; 
    outline: none;
    font-size: 14px;
    color: #1877F2;
    font-weight: bold;
    filter: brightness(90%);
    &:hover {
      filter: brightness(110%);
    }
  }
`

export const Tag = styled.div`
  display: flex;
  flex-flow: row wrap;
  background: #424242;
  height: 28px;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;
  border-radius: 6px;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;
  font-size: 13px;
  &.selected {
    background: #1877F2;
  }
  &:hover {
    background: #616161;
  }
`

export const CheckboxContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  color: white;
  font-weight: 500;
  font-size: 13px;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    .not-selected {
      border: 1px solid #1877F2;
    }
  }
`

export const Checkbox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 3px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-sizing: border-box;
  margin-right: 6px;
  transition: border 0.2s ease;
  pointer-events: none;
  img {
    width: 0px;
    height: 0px;
  }
  &.selected {
    background: #1877F2;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 12px;
      height: 12px;
    }
    animation: appear 0.2s ease;
    @keyframes appear {
      from {
        background: transparent;
      }
      to {
        background: #1877F2;
      }
    }
  }
`

export const Circle = styled.div`
  position: relative;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: transparent;
  margin-right: 10px; 
  display: flex;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  justify-content: center;
  transition: all 0.2s ease;
  box-sizing: border-box;
  &.selected{
    background: #1877F2;
    border: 1px solid #1877F2;
    &::after{
      position: absolute;
      content: '';
      width: 22px;
      height: 22px;
      box-sizing: border-box;
      border-radius: 50%;
      background: white;
      transform: scale(0.5);
      margin: auto;
    }
  }
`

export default () => {}
