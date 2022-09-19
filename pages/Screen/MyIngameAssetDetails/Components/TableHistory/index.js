import CustomLink from 'pages/Components/CustomLink'
import { ellipsisAddress } from 'common/function'
import React, { useState } from 'react'
import { Table } from 'antd'
import { ExportOutlined } from '@ant-design/icons'
import './style.scss'
const TableHistory = ({ data }) => {
  const getABI = (abi) => {
    abi = '0x1d3b46542ed57b8abbc3e65119aeaf94c4b5f83c403787bfe0f73fdb5585f97a'
    return `https://devnet.bscscan.com/tx/${abi}`
  }
  const column = [
    {
      title: 'Date',
      align: 'center',
      dataIndex: 'date'
      // width: '10%',

    },
    {
      title: 'Price',
      dataIndex: 'price'
    },
    {
      title: 'From',
      dataIndex: 'from',
      render: (text) => (
        <CustomLink route={'/'}>
          <a className='on-hover'>
            {ellipsisAddress(text, 5, 4)}
          </a>
        </CustomLink>

      )
    },
    {
      title: 'To',
      dataIndex: 'to',
      render: (text) => (
        <CustomLink route={'/'}>
          <a className='on-hover'>
            {ellipsisAddress(text, 5, 4)}
          </a>
        </CustomLink>

      )
    },
    {
      title: 'TOMOSCAN',
      dataIndex: 'scan',
      render: (text) => (
        <a href={getABI('')}><ExportOutlined /></a>

      )
    }
  ]
  return (
    <Table
      className='tb-history'
      style={{ width: '100%' }}
      //   scroll={{
      //     x: widthScreen < 1000 ? '1000px' : false
      //   }}
      columns={column}
      dataSource={data}
    />
  )
}

export default TableHistory
