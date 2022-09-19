import { useEffect, useState } from 'react'
import { Router } from 'common/routes'

export function useFilters () {
  const [queries, setQueries] = useState(new Map())
  const [currentQueryString, setCurrentQueryString] = useState(null)
  const [numberQuery, setNumberQuery] = useState(0)

  const convertQueryObjToString = (query) => {
    let queryString = '?'
    for (let key in query) {
      queryString += `${key}=${query[key]}&`
    }
    return queryString.substring(0, queryString.length - 1)
  }

  const setNewQuery = (propertyName, value) => {
    let newQueries = new Map()
    newQueries.set(propertyName, [value])
    setQueries(newQueries)
  }

  const updateQuery = (propertyName, value) => {
    let newQueries = new Map(JSON.parse(JSON.stringify(Array.from(queries))))
    if (Array.isArray(value)) {
      newQueries.set(propertyName, [...value])
    } else {
      newQueries.set(propertyName, [value])
    }
    if (propertyName !== 'page') {
      newQueries.delete('page')
    }
    setQueries(newQueries)
  }

  const updateQueries = (queryObj) => {
    let newQueries = new Map(JSON.parse(JSON.stringify(Array.from(queries))))
    for (let key in queryObj) {
      newQueries.set(key, [queryObj[key]])
    }
    setQueries(newQueries)
  }

  const resetFilter = (propertyName) => {
    let newQueries = new Map(JSON.parse(JSON.stringify(Array.from(queries))))
    newQueries.delete(propertyName)
    setQueries(newQueries)
  }

  const resetAllFilters = (keptProperty) => {
    let newQueries = new Map()
    if (keptProperty) {
      newQueries.set(keptProperty, queries.get(keptProperty))
    }
    setQueries(newQueries)
  }

  useEffect(() => {
    let numberQuery = 0
    if (queries.size > 0) {
      let query = {}
      for (let [key, value] of queries) {
        query[key] = value
        if (value.length > 0 && key !== 'page' && key !== 'sortBy') {
          numberQuery = numberQuery + value.length
        }
      }
      setCurrentQueryString(convertQueryObjToString(query))
    } else {
      setCurrentQueryString(' ')
    }
    setNumberQuery(numberQuery)
  }, [queries])

  useEffect(() => {
    const { query } = Router.router
    let newQueries = new Map()
    if (Object.keys(query).length > 0) {
      for (let key in query) {
        const values = query[key].split(',')
        newQueries.set(key, values)
      }
      setQueries(newQueries)
    }
  }, [Router.router.query])

  return {
    currentQueryString,
    queries,
    numberQuery,
    setNewQuery,
    updateQuery,
    updateQueries,
    resetFilter,
    resetAllFilters
  }
}
