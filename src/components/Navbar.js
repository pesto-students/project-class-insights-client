import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink as RRNavLink } from 'react-router-dom';

import { userActions } from '../actions';

import { routes } from '../constants/routes';

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  }

  render() {
    const { isOpen } = this.state;
    const { logout } = this.props;
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href={routes.Home}>
            CLASS INSIGHTS
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink activeClassName="active" tag={RRNavLink} to={routes.ClientLogin}>
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink activeClassName="active" tag={RRNavLink} to={routes.ClientSignup}>
                  Register
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Actions
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <NavItem>
                      <NavLink activeClassName="active" tag={RRNavLink} to={routes.ClientFeedBackForm}>
                      Feedbacks
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink activeClassName="active" tag={RRNavLink} to={routes.BatchesPage}>
                        Batches
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <NavItem>
                      <NavLink onClick={logout} activeClassName="active" tag={RRNavLink} to={routes.BackEndLogin}>
                        Logout
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}


NavBar.defaultProps = {
  logout: null,
};

NavBar.propTypes = {
  logout: PropTypes.func,
};
const mapDispatchToProps = {
  logout: userActions.logout,
};
const NavBarContainer = connect(null, mapDispatchToProps)(NavBar);
export default NavBarContainer;
