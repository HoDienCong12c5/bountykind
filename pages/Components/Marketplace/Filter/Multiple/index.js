import React, { useEffect, useState } from 'react'
import { Collapse } from 'antd'
import { Router } from 'common/routes'
import {
  FilterContainer,
  Tag,
  CheckboxContainer,
  Checkbox,
  PanelHeader
}
from '../style'
import { images } from 'config/images'

const MultipleFilter = ({
  filterType = 'tag',
  flexDirection = 'row',
  headerName = null,
  propertyName = null,
  keys = [],
  selectedKeys = [],
  onKeysChange,
  valueField = null,
  nameField = null,
  resetFilter
}) => {
  const settings = { openAnimation: null }
  const { Panel } = Collapse
  const [allKeys, setAllKeys] = useState([])

  const onChange = (key) => {
    console.log(key)
  }

  const handleData = () => {
    setAllKeys(keys)
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

  const checkIfSelected = (key) => {
    let isSelected = false
    if (valueField) {
      isSelected = selectedKeys.find((sKey) => sKey === key[valueField])
    } else {
      isSelected = selectedKeys.find((sKey) => sKey === key)
    }
    return isSelected
  }

  useEffect(() => { }, [Router.router.query])

  const renderTags = () => {
    return (
      allKeys?.length > 0 &&
      allKeys.map((key, i) => (
        <Tag
          className={
            checkIfSelected(key) ? 'selected' : null
          }
          onClick={() => {
            handleClick(key)
          }}
          key={i}
        >
          {nameField ? key[nameField] : key}
        </Tag>
      ))
    )
  }

  const renderCheckboxes = () => {
    return (
      allKeys?.length > 0 &&
      allKeys.map((key, i) => (
        <CheckboxContainer
          className={
            checkIfSelected(key)
              ? 'selected'
              : 'not-selected'
          }
          onClick={() => {
            handleClick(key)
          }}
          key={i}
        >
          <Checkbox
            className={
              checkIfSelected(key)
                ? 'selected'
                : 'not-selected'
            }
          >
            <img src={images.icCheckmark} />
          </Checkbox>
          {nameField ? key[nameField] : key}
        </CheckboxContainer>
      ))
    )
  }

  return (
    <Collapse
      {...settings}
      defaultActiveKey={[propertyName]}
      onChange={onChange}
    >
      <Panel header={
        <PanelHeader>{headerName} <button onClick={(e) => { e.stopPropagation(); resetFilter(propertyName) }}>Reset</button></PanelHeader>
      } key={propertyName}>
        <FilterContainer flexDirection={flexDirection}>
          {filterType === 'tag' && renderTags()}
          {filterType === 'checkbox' && renderCheckboxes()}
          {filterType === 'range' && renderCheckboxes()}
        </FilterContainer>
      </Panel>
    </Collapse>
  )
}

export default MultipleFilter
