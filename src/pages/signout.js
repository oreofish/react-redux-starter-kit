import { Component, PropTypes } from 'react'
import AuthStore from '../stores/auth'

export default class SignOut extends Component {
  static displayName = 'SignOut'
  static contextTypes = {router: PropTypes.object.isRequired}

  // constructor() {
  //   super()
  // }

  componentWillMount() {
    AuthStore.signOut(() => {
      this.context.router.replace('landing')
    })
  }

  render() {
    return null
  }
}

