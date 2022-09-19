import React from 'react'
import { Link, Router } from 'common/routes'

export default ({ route, children }) => {
  let className = children.props.className || ''
  const current = Router.asPath?.split('?')[0]?.split('/')?.join('')?.split(' ')?.join('')
  const propRoute = route.split('?')[0]?.split('/')?.join('')?.split(' ')?.join('')
  if (current === propRoute) {
    className = `${className} selected`
  }
  if (route) {
    return (
      <Link route={route}>{React.cloneElement(children, { className })}</Link>
    )
  }
  return React.cloneElement(children, { className })
}
