import CustomLink from 'pages/Components/CustomLink'
import { ellipsisAddress } from 'common/function'
import React, { useState } from 'react'
import { List } from 'antd'
import { ExportOutlined } from '@ant-design/icons'
import './style.scss'
const TableDesktop = ({ data, loadMore }) => {
  const widthScreen = window.innerWidth
  const rowItem = (title, content, link = false, isImage = false, isIcon = false) => {
    return (
      <div className='row-item' >
        <div className='title'>{title}</div>
        <div>
          {
            isIcon ? (
              <CustomLink route={`/infor-user/${content}`}>
                <a>
                  <ExportOutlined />
                </a>
              </CustomLink>
            ) : (
              link ? (
                <CustomLink route={'/'}>
                  <a className='on-hover'>
                    {content}
                  </a>
                </CustomLink>
              ) : (
                isImage ? (
                  <img src={content} style={{ height: 80, width: 80, borderRadius: 40 }} />
                )
                  : content
              )
            )
          }
        </div>

      </div>

    )
  }
  const itemList = (item, index) => {
    return (
      <div className='item-list-ranking'>
        {
          rowItem('Image', item.image, false, true)
        }
        {
          rowItem('User', ellipsisAddress(item.address, widthScreen > 480 ? 10 : 8, widthScreen > 480 ? 8 : 5), true)
        }
        {
          rowItem('Bounty World Point', item.bPoint)
        }
        {
          rowItem('Account page', item.address, false, false, true)
        }
      </div>
    )
  }
  return (
    <List
      className='list-ranking'
      dataSource={data}
      loadMore={loadMore && <div>loading....</div>}
      renderItem={(item, index) => (
        <List.Item className={`${index % 2 === 0 ? 'row-even' : 'row-odd'} ${index === 0 && 'row-first'} ${data.length === index + 1 && 'row-last'}  `}>
          {itemList(item, index)}
        </List.Item>
      )}
    />
  )
}
export default TableDesktop
