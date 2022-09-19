
import CustomLink from 'pages/Components/CustomLink'
import { ellipsisAddress } from 'common/function'
import React, { useState } from 'react'
import { Table } from 'antd'
import './style.scss'
import { ExportOutlined } from '@ant-design/icons'
const TableDesktop = ({ data, loadMore, onLoadMoreData, pageSize }) => {
  const [widthScreen, setWidthScreen] = useState(window.innerWidth)
  window.addEventListener('resize', function () {
    setWidthScreen(window.innerWidth)
  })
  const column = [
    {
      title: 'Image',
      dataIndex: 'image',
      render: (text) => (
        <img src={text} style={{ height: 80, width: 80, borderRadius: 40 }} />
      )
    },
    {
      title: 'User',
      dataIndex: 'address',
      render: (text) => (
        <CustomLink route={'/'}>
          <a className='on-hover'>
            { ellipsisAddress(text, 10, 10)}
          </a>
        </CustomLink>
      )
    },
    {
      title: 'Bounty World Point',
      dataIndex: 'bPoint'
    },
    {
      title: 'Account page',
      dataIndex: 'totalRank',
      render: (text, record) => (
        <CustomLink route={`/infor-user/${record.address}`}>
          <a>
            <ExportOutlined />
          </a>
        </CustomLink>
      )
    }
  ]
  return (
      <>
        <Table
          className='table-ranking'
          loading={loadMore && <div>loading....</div>}
          dataSource={data}
          columns={column}
          pagination={{
            onChange: onLoadMoreData,
            pageSize: pageSize
          }}
        />
      </>

  )
}
export default TableDesktop
