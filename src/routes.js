import React from 'react'
import { Route, IndexRoute } from 'react-router'

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout'
import AdminLayout from 'layouts/AdminLayout'
import HomeView from 'components/HomeView/HomeView'
import HomePage from 'pages/home'
import SignInPage from 'pages/signin'
import SignUpPage from 'pages/signup'
import SignOutPage from 'pages/signout'
import ProfilePage from 'pages/profile'
import AdminPage from 'components/AdminHome'
import TodoContainer from 'containers/TodoContainer'
import TodoList from 'containers/TodoList'
import TodoShow from 'containers/TodoShow'
import TodoEdit from 'containers/TodoEdit'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView}/>
    <Route path='landing' component={HomePage}/>
    <Route path='todos' component={TodoContainer}>
      <IndexRoute component={TodoList}/>
      <Route path='show/:id' component={TodoShow}/>
      <Route path='new' component={TodoEdit}/>
      <Route path='edit/:id' component={TodoEdit}/>
    </Route>
    <Route path='signin' component={SignInPage}/>
    <Route path='signup' component={SignUpPage}/>
    <Route path='signout' component={SignOutPage}/>
    <Route path='profile' component={ProfilePage}/>
    <Route path='admin' component={AdminLayout}>
      <IndexRoute component={AdminPage}/>
    </Route>
  </Route>
)

