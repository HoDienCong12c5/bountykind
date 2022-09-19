import { Tabs } from 'antd'
import React from 'react'
import './style.scss'

const Tab = (prop) => {
  const { item, onClick, defaultActiveKey = 1 } = prop
  const { TabPane } = Tabs
  return (
    <Tabs {...prop} defaultActiveKey={defaultActiveKey} onChange={onClick} >
      {
        item.map((item, index) => {
          return (
            <TabPane tab={item.title} key={item.title} className='tab-change' />
          )
        })
      }
    </Tabs>
  )
}
export default Tab
