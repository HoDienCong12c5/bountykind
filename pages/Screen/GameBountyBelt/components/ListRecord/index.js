import React, { useRef } from 'react'
import { List } from 'antd'
import VirtualList from 'rc-virtual-list'
import EmptyData from 'pages/Components/EmptyData'
import styled, { css } from 'styled-components'
import { COLOR } from 'common/constants'
import InfiniteScroll from 'react-infinite-scroller'

const MyList = styled(List)`
  &.ant-list {
    color: white !important;
    max-height: 300px;
    overflow-y: scroll;
  }
  &.ant-list-bordered {
    border: none;
  }
`
const ContainerListItems = styled.div``
const Item = styled.div`
  width: 100%;
  display: inline-flex;
  ${(props) =>
    props.highest &&
    css`
    /* font-size:16px */
      background: -webkit-linear-gradient(
        90deg,
        #24e4f9 17.19%,
        #da61e5 68.23%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    `};
`
const ItemLeft = styled.div`
flex:1;
  display: inline-flex;
`
const ItemRight = styled.div`
  flex: 1;

  display: inline-flex;
`
const NumberRecord = styled.div`
margin-left:20px;
`
const ListRecord = ({ data, handleInfiniteOnLoad }) => {
  const listRef = useRef()
  const ItemList = (item) => {
    return (
      <ContainerListItems>
        <Item highest={item.index === 0}>
          <ItemLeft>
            <div>{item.index + 1}</div>
            <NumberRecord>1.999</NumberRecord>
          </ItemLeft>
          <ItemRight>
            <div>Player Takashimaya</div>
          </ItemRight>
        </Item>
      </ContainerListItems>
    )
  }

  return (
    <div id='scrollableDiv' style={{ height: 300, overflow: 'auto' }}>
      {data?.length > 0 ? (
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={handleInfiniteOnLoad}
          hasMore
          scrollableTarget='scrollableDiv'
          useWindow={false}
        >
          <MyList
            className=''
            bordered
            grid={{
              xs: 1,
              sm: 1
            }}
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item>
                <ItemList item={item} index={index} />
              </List.Item>
            )}
          />
        </InfiniteScroll>
      ) : (
        <EmptyData text='No Record Found' />
      )}
    </div>
  )
}

export default ListRecord
