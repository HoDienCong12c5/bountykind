import React, { useEffect, useState } from 'react'
import { Collapse } from 'antd'
import { Router } from 'common/routes'
import {
  FilterContainer,
  Tag,
  CheckboxContainer,
  Checkbox,
  Circle,
  PanelHeader
} from '../style'
import { images } from 'config/images'

const SingleFilter = ({
  filterType = 'tag',
  flexDirection = 'row',
  headerName = null,
  propertyName = null,
  keys = [],
  selectedKey = null,
  onKeyChange,
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

  const checkIfSelected = (key) => {
    let selected = false
    if (valueField) {
      selected = selectedKey === key[valueField]
    } else {
      selected = selectedKey === key
    }
    return selected
  }

  const handleClick = (key) => {
    let keyValue = key
    if (valueField) {
      keyValue = key[valueField]
    }
    onKeyChange(propertyName, keyValue)
  }

  useEffect(() => { }, [Router.router.query])

  const renderTags = () => {
    return (
      allKeys?.length > 0 &&
      allKeys.map((key, i) => (
        <Tag className={checkIfSelected(key) ? 'selected' : null}
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
          className={checkIfSelected(key) ? 'selected' : 'not-selected'}
          onClick={() => {
            handleClick(key)
          }}
          key={i}
        >
          <Checkbox className={checkIfSelected(key) ? 'selected' : 'not-selected'}>
            <img src={images.icCheckmark} />
          </Checkbox>
          {nameField ? key[nameField] : key}
        </CheckboxContainer>
      ))
    )
  }

  const renderCircle = () => {
    return (
      allKeys?.length > 0 &&
      allKeys.map((key, i) => (
        <CheckboxContainer
          className={checkIfSelected(key) ? 'selected' : 'not-selected'}
          onClick={() => {
            handleClick(key)
          }}
          key={i}
        >
          <Circle className={checkIfSelected(key) ? 'selected' : 'not-selected'} />
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
          {filterType === 'circle' && renderCircle()}
        </FilterContainer>
      </Panel>
    </Collapse>
  )
}

export default SingleFilter
