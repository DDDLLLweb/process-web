import React from 'react'
import { Route } from 'react-router-dom'
import { MainContent } from '../components/'
import Metaqtable from '../pages/metactl'
import { User, Role } from '../pages/system/'
export const childRoutes = [
  {
    'path':'/app/dashboard',
    'component':MainContent,
  },
  {
    'path':'/app/mqctl/metaq',
    'component': Metaqtable,
  },
  {
    'path':'/app/system/users',
    'component': User,
  },
  {
    'path':'/app/system/roles',
    'component': Role,
  },
  {
    'path':'/app/',
    'component':MainContent,
    'exact': true,
  },
]

const routesNode = childRoutes.map((route,index)=>(
  <Route key={index} path={route.path} exact={route.exact} component={route.component} />
))

export {
  routesNode,
}