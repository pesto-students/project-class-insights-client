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
import { userService } from '../services';
import { routes } from '../constants/routes';
import { dataTest } from '../constants/dataTest.constants';

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
    let NavbarStructure;
    const loggedIn = userService.isLoggedIn();
    const isStudent = userService.isStudent();

    if (loggedIn && !isStudent) {
      NavbarStructure = (
        <Navbar color="dark" dark expand="md">
          <NavbarBrand tag={RRNavLink} to={routes.Home}>
            CLASS INSIGHTS
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>

              <NavItem>
                <NavLink tag={RRNavLink} to={routes.Dashboard}>
                  Dashboard
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={RRNavLink}
                  to={routes.ClientFeedBackForm}
                  data-test={dataTest.createFeedback}
                >
                  Feedback Form
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  tag={RRNavLink}
                  to={routes.BatchesPage}
                  data-test={dataTest.batchesButton}
                >
                  Batches
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink tag={RRNavLink} to={routes.AddBatch}>
                  Add Batch
                </NavLink>
              </NavItem>

              <UncontrolledDropdown nav inNavbar data-test={dataTest.navbarAction}>
                <DropdownToggle nav caret>
                  Actions
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <NavItem>
                      <NavLink tag={RRNavLink} to={routes.ClientFeedBackForm}>
                      Feedbacks
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink tag={RRNavLink} to={routes.BatchesPage}>
                        Batches
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <NavItem>
                      <NavLink
                        onClick={logout}
                        tag={RRNavLink}
                        to={routes.BackEndLogin}
                        data-test={dataTest.logout}
                      >
                        Logout
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      );
    } else if (loggedIn && isStudent) {
      NavbarStructure = (
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href={routes.Home}>
            CLASS INSIGHTS
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Actions
                </DropdownToggle>
                <DropdownMenu right>
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
      );
    } else {
      NavbarStructure = (
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
            </Nav>
          </Collapse>
        </Navbar>
      );
    }
    return (
      <div>
        {NavbarStructure}
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
