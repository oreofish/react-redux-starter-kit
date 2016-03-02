import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Navbar, Nav, NavItem, Glyphicon } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import AuthStore from '../stores/auth'

export default class AppNavbar extends Component {
  static displayName = 'AppNavbar'

  static propTypes = {
    brand: PropTypes.string,
    user: PropTypes.object
  }
  static defaultProps = {user: AuthStore.getUser()}

  constructor(props) {
    super(props)
    this.state = {user: props.user}
  }

  componentWillMount() {
    AuthStore.init()
  }

  componentDidMount() {
    AuthStore.addChangeListener(this.onStoreChange)
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this.onStoreChange)
  }

  onStoreChange = () => {
    this.setState({
      user: AuthStore.getUser()
    })
  }

  render() {
    return (
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            {this.renderBrand()}
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {this.renderNavLinks()}
        </Navbar.Collapse>
      </Navbar>
    )
  }

  renderBrand() {
    return (<Link to='landing'>{this.props.brand}</Link>)
  }

  renderNavLinks() {
    if (this.state.user) {
      return (
        <Nav eventKey={0}>
          <NavItem eventKey={1} href='profile'>
            <Glyphicon glyph='user'/> {this.state.user.username}
          </NavItem>
          <NavItem href='signout'>
            <Glyphicon glyph='off'/> Sign out
          </NavItem>
        </Nav>
      )
    }
    return (
      <Nav eventKey={0}>
        <LinkContainer to='signup'>
          <NavItem>
            <Glyphicon glyph='user'/> Sign up
          </NavItem>
        </LinkContainer>
        <LinkContainer to='signin'>
          <NavItem>
            <Glyphicon glyph='user'/> Sign in
          </NavItem>
        </LinkContainer>
      </Nav>
    )
  }
}
