import React from 'react'
import { Pagination, Input } from 'antd'
import { images } from 'config/images'
import styled from 'styled-components'
import { COLOR } from 'common/constants'
const MyPaginationCustom = styled(Pagination)`
--color : ${COLOR.white2}; /* color */
height: 35px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  svg {
    color: white;
  }
  input {
    border: 1px solid var(--color) !important;
    border-radius: 8px !important;
    background: transparent !important;
    height: 35px !important;
    margin-top: -10px !important;
    margin-left: 10px !important;

    &:hover, &:focus {
    border-color: white !important;
  }
  }
  .ant-pagination-slash {
    color: white;
  }
  .ant-pagination-simple-pager {
    color: white;
    font-weight: bold;
  }
`
const ImageIconChangePage = styled.img`
opacity: 0.6;
&:hover {
opacity:1;
}
`
const MyPagination = ({ handleChangePage, queries, total, pageSize = 10 }) => {
  return (
    <MyPaginationCustom
      size='small'
      defaultCurrent={1}
      current={

        queries ? (queries.get('page') ? parseInt(queries.get('page')[0]) : 1) : 1
      }
      onChange={handleChangePage}
      total={total ?? 0}
      pageSize={pageSize}
      simple
      itemRender={(current, type, originalElement) => {
        if (type === 'prev') {
          return <ImageIconChangePage src={images.icPrev} alt='prev' />
        }
        if (type === 'next') {
          return <ImageIconChangePage src={images.icNext} alt='next' />
        }
        return originalElement
      }
      }

    />
  )
}

export default MyPagination
