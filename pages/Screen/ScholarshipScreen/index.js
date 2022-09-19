import React, { useEffect, useState } from 'react'
import {
  Container,
  MainContainer,
  BackContainer,
  PaginationContainer
} from './styled'
import { Router } from 'common/routes'
import { images } from 'config/images'
import Media from 'react-media'
import Header from './components/Header'
import TableDesktop from './components/TableDesktop'
import TableMobile from './components/TableMobile'
import { useSelector } from 'react-redux'
import scholarshipService from 'services/scholarshipService'
import './style.scss'
import MyPagination from 'pages/Components/MyPagination'
import { useFilters } from 'hooks/useFilters'
import Loading from 'pages/Components/Loading'
const ScholarshipScreen = () => {
  const userData = useSelector(state => state.userData)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalPage, setTotalPage] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const getListScholarship = async () => {
    const list = await scholarshipService.getScholarshipList()
    if (list) {
      setData(list.data.data)
      setTotalPage(list.data.pages)

      setIsLoading(false)
    }
    setIsLoading(false)
  }
  useEffect(() => {
    getListScholarship()
  }, [])

  const tableDesktop = () => {
    return (
      <div >
        <TableDesktop data={data} isLoading={isLoading} />
      </div>

    )
  }
  const tableMobile = () => {
    return <TableMobile data={data} isLoading={isLoading} />
  }
  const {
    currentQueryString,
    queries,
    numberQuery,
    updateQuery,
    updateQueries,
    resetFilter,
    resetAllFilters,
    setNewQuery
  } = useFilters()
  const handleChangePage = (page) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // updateQuery('page', parseInt(page))
  }

  return (
    <Container className='scholarship-container'>
      <MainContainer>
        <BackContainer>
          <button
            onClick={() => {
              Router.back()
            }}
          >
            <img src={images.icBack} />
          </button>
        </BackContainer>
        <Header />
        {isLoading ? <Loading fitContainer withWrapper />
          : <>
            <Media query='(min-width: 768px)'>
              {(match) => {
                if (match) {
                  return tableDesktop()
                }
                return tableMobile()
              }}
            </Media>
            <PaginationContainer>
              <MyPagination
                handleChangePage={handleChangePage}
                // queries={queries}
                total={20}
              />
            </PaginationContainer>
          </>

        }

      </MainContainer>
    </Container>
  )
}

export default ScholarshipScreen
