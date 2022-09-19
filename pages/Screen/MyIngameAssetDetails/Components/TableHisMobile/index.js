import { List } from 'antd'
import React from 'react'
import './style.scss'
import { ellipsisAddress, numberWithCommas } from 'common/function'
import CustomLink from 'pages/Components/CustomLink'
import { ExportOutlined } from '@ant-design/icons'
const TableHisMobile = ({ data, loadMore }) => {
  const getABI = (abi) => {
    abi = '0x1d3b46542ed57b8abbc3e65119aeaf94c4b5f83c403787bfe0f73fdb5585f97a'
    return `https://devnet.bscscan.com/tx/${abi}`
  }
  const rowItem = (title, content, link, icon = false) => {
    return (
      <div className='row-item'>
        <div className='title'>
          {title}
        </div>
        <div className='content'>
          {
            icon ? (
              <a href={getABI('')}><ExportOutlined /></a>
            ) : link ? (
              <CustomLink >
                <a className='on-hover' >
                  {content}
                </a>
              </CustomLink>
            ) : (
              <div>
                {content}
              </div>
            )
          }
        </div>
      </div>
    )
  }
  const itemList = (item) => {
    return (
      <div className='item-list'>
        {
          rowItem('Date', item.date)
        }
        {
          rowItem('Price', numberWithCommas(item.price || 0))
        }
        {
          rowItem('From', ellipsisAddress(item.from), `/${item.from}`)
        }
        {
          rowItem('To', ellipsisAddress(item.to), `/${item.to}`)
        }
        {
          rowItem('TOMOSCAN', '', `/${item.to}`, true)
        }
      </div>
    )
  }

  return (
    <List
      loadMore={loadMore && <div>loading.....</div>}
      className='list-history-my-nft'
      dataSource={data}
      style={{ width: '100%' }}
      renderItem={(item, index) => (
        <List.Item className={`${index % 2 === 0 ? 'row-even' : 'row-odd'} ${index === 0 && 'row-first'} ${data.length === index + 1 && 'row-end'} `}>
          {itemList(item)}
        </List.Item>
      )}
    />
  )
}
export default TableHisMobile
