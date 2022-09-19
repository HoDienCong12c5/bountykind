import React, { useEffect, useState } from 'react'
import { Collapse } from 'antd'
import { Router } from 'common/routes'
import {
  FilterContainer,
  PanelHeader,
  CollapseFilter
}
from './style'
import { images } from 'config/images'
import { CaretRightOutlined } from '@ant-design/icons'
import ButtonFilterRange from 'pages/Components/ButtonFilterRange'
const FilterBottom = ({
  flexDirection = 'row',
  headerName = null,
  propertyName = null,
  keys = [],
  selectedKeys = [],
  onKeysChange,
  valueField = null,
  nameField = null,
  resetFilter,
  isShowReset = false,
  keyCustom = []
}) => {
  const settings = { openAnimation: null }
  const { Panel } = Collapse
  // useState
  const [allKeys, setAllKeys] = useState([])
  // function
  const onChange = (key) => {
    console.log(key)
  }

  const handleData = () => {
    if (keyCustom.length > 0) {
      setAllKeys(keyCustom)
    } else {
      setAllKeys(keys)
    }
  }

  useEffect(() => {
    handleData()
  }, [])

  const handleClick = (key) => {
    if (valueField) {
      if (selectedKeys.findIndex(sKey => sKey === key[valueField]) === -1) {
        onKeysChange(propertyName, [...selectedKeys, key[valueField]])
      } else {
        const newSelectedKeys = selectedKeys.filter(sKey => sKey !== key[valueField])
        if (newSelectedKeys?.length > 0) {
          onKeysChange(propertyName, newSelectedKeys)
        } else {
          resetFilter(propertyName)
        }
      }
    } else {
      if (selectedKeys.findIndex(sKey => sKey === key) === -1) {
        onKeysChange(propertyName, [...selectedKeys, key])
      } else {
        const newSelectedKeys = selectedKeys.filter(sKey => sKey !== key)
        if (newSelectedKeys?.length > 0) {
          onKeysChange(propertyName, newSelectedKeys)
        } else {
          resetFilter(propertyName)
        }
      }
    }
  }

  useEffect(() => { }, [Router.router.query])

  const changeRangeFilter = (key, minRange, maxRange) => {
    console.log('====================================')
    console.log(key, minRange, maxRange)
    console.log('====================================')
  }
  const renderFilterRange = () => {
    return (
      allKeys?.length > 0 &&
      allKeys.map((item, i) => (
        <ButtonFilterRange
          key={item}
          title={item.title}
          icon={item?.icon ?? ''}
          minRange={item?.minRange ?? 0}
          maxRange={item?.maxRange ?? 100}
          sizeRange={item?.sizeRange ?? 50}
          changeRange={changeRangeFilter}
        />
      ))
    )
  }

  return (
    <CollapseFilter
      {...settings}
      defaultActiveKey={[propertyName]}
      onChange={onChange}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
    >
      <Panel header={
        <PanelHeader>{headerName}
          {
            isShowReset && (
              <button onClick={(e) => { e.stopPropagation(); resetFilter(propertyName) }}>Reset</button>
            )
          }
        </PanelHeader>
      } key={propertyName}>
        <FilterContainer flexDirection={flexDirection}>
          {renderFilterRange()}
        </FilterContainer>
      </Panel>
    </CollapseFilter>
  )
}

export default FilterBottom
