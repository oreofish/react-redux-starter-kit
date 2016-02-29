import React from 'react'
import { Route, IndexRoute, Redirect, IndexRedirect } from 'react-router'

import Application from '../application'

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import HomeView from 'views/HomeView/HomeView'

export default (store) => (
  <Route path='/' component={Application}>
    <IndexRoute component={HomeView}/>
    <Route path='landing' component={HomeView}/>
  </Route>
)

//<Route path='/' component={Application}>
//  <IndexRoute component={HomeView}/>
//  <Route path='landing' component={HomePage}/>
//  <Route path='auth' component={AuthLayout}>
//  <Route path='signin' component={SignInPage}/>
//  <Route path='signup' component={SignUpPage}/>
//  <Route path='signout' component={SignOutPage}/>
//  <IndexRedirect component={SignInPage}/>
//  </Route>
//  <Route path="admin" component={AdminLayout}>
//  <IndexRoute component={AdminPage}/>
//  <Route path='profile' component={ProfilePage}/>
//  </Route>
//  </Route>
