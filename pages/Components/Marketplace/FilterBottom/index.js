import React, { useEffect, useState, useCallback } from 'react'
import { Collapse } from 'antd'
import { Router } from 'common/routes'
import {
  FilterContainer,
  Tag,
  CheckboxContainer,
  CollapseFilter,
  PanelHeader
}
from './style'
import ButtonFilter from 'pages/Components/ButtonFilter'
import { images } from 'config/images'
import { ICON_BUTTON_ESPECIALLY } from 'common/constants'
import { CaretRightOutlined } from '@ant-design/icons'
const stores = new Set()
const FilterBottom = ({
  filterType = 'button',
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
  const [isKeyCustom, setIsKeyCustom] = useState(false)
  const [itemSelected, setItemSelected] = useState([])
  // function
  const onChange = (key) => {
    console.log(key)
  }

  const handleData = () => {
    if (headerName.toLowerCase().includes('element')) {
      let _keysTemp = []
      keys.map((key, index) => {
        _keysTemp.push({
          key,
          icon: ICON_BUTTON_ESPECIALLY[key]?.icon,
          iconHover: ICON_BUTTON_ESPECIALLY[key]?.iconHover
        })
      })
      setIsKeyCustom(true)
      setAllKeys(_keysTemp)
    } else {
      if (keyCustom.length > 0) {
        setAllKeys(keyCustom)
      } else {
        setAllKeys(keys)
      }
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
    if (itemSelected.length > 0) {
      itemSelected.findIndex(sKey => sKey === key) === -1
        ? setItemSelected([...itemSelected, key])
        : setItemSelected(itemSelected.filter(sKey => sKey !== key)
        )
    } else {
      setItemSelected([...itemSelected, key])
    }
  }

  useEffect(() => {
    if (selectedKeys.length !== itemSelected.length) {
      setItemSelected(selectedKeys)
    }
  }, [Router.router.query])

  const renderButton = () => {
    return (
      allKeys?.length > 0 &&
      allKeys.map((item, i) => (
        <ButtonFilter
          key={i}
          typeButton={isKeyCustom ? item.key : item}
          isSelected={itemSelected.includes(isKeyCustom ? item.key : item)}
          onClick={() => {
            handleClick(isKeyCustom ? item.key : item)
          }}
          title={
            nameField
              ? isKeyCustom
                ? item.key[nameField]
                : item[nameField]
              : isKeyCustom
                ? item.key
                : item
          }
          icon={isKeyCustom ? item?.icon : ''}
          iconHover={isKeyCustom ? item?.iconHover : ''}
        />
      ))
    )
  }
  return (
    <CollapseFilter
      {...settings}
      defaultActiveKey={[propertyName]}
      onChange={onChange}
      style={{
        border: 1
      }}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
    >
      <Panel header={
        <PanelHeader>
          {headerName}
          {
            isShowReset && (
              <button onClick={(e) => { e.stopPropagation(); resetFilter(propertyName) }}>Reset</button>
            )
          }
        </PanelHeader>
      } key={propertyName}>
        <FilterContainer flexDirection={flexDirection}>
          {filterType === 'button' && renderButton()}

        </FilterContainer>
      </Panel>
    </CollapseFilter>
  )
}

export default React.memo(FilterBottom)
