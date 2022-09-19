import React from 'react'
import { Select } from 'antd'
import styled from 'styled-components'
import { images } from 'config/images'
const SelectCustom = styled(Select)`
  width: 120px;
  .ant-select-selector {
    background: transparent !important;
    color: white;
    border: none !important;
    &:focus {
    border: none !important;
    }
    box-shadow: none !important;
    margin-left: 10px;
  }
  .ant-select-selection-item{
    text-align:end;
  }
  .ant-select-arrow{
        transform: scale(1.3);
      
  }
 .filter-select-dropdown{
    background: rgba(201, 201, 201, 0.1) !important;
    border: 1px solid rgba(255, 255, 255, 0.3) !important;
    border-radius: 8px !important;
    overflow: hidden !important;
    box-sizing: border-box !important;
    .ant-select-item{
        background: #1c1f25 !important;
        color: white !important;
        font-weight: bold !important;
        height: 40px !important;
        &:hover{
            text-decoration: underline !important;
            
        }

    }
    .ant-select-item-option-content{
        display: flex !important;
        align-items: center !important;
    }

}
`
const IconDropdown = styled.img`
  margin-bottom:5px;
  margin-left: 10px;
`
const MySelect = ({ ...props }) => {
  return (
    <SelectCustom {...props}
      suffixIcon={<IconDropdown src={images.icDropdownArrow} />}
    />
  )
}

export default MySelect
