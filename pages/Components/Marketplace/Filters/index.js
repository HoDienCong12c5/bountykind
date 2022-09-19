import React, { useEffect, useState } from 'react'
import {
  FiltersContainer,
  HeaderFilter,
  ResetAllFiltersBTN
} from './style'
const Filters = ({ title = 'Filter', showClearButton = true, width = '100%', resetAllFilters, children, numberFilter = 0 }) => {
  return (
    <FiltersContainer width={width}>
      <HeaderFilter>
        <div style={{
          textTransform: 'uppercase'
        }}>
          {title}

        </div>
        {showClearButton && <ResetAllFiltersBTN onClick={numberFilter > 0 ? resetAllFilters : null}>Clear All ({numberFilter})</ResetAllFiltersBTN>}
      </HeaderFilter>
      {children}
    </FiltersContainer>
  )
}

export default Filters
