import React from 'react';
import {
  Navbar,
  Collapse,
  NavbarToggler,
  NavbarBrand,
  NavLink,
  Nav,
  NavItem,
  Container
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookSquare,
  faTwitter,
  faInstagram
} from '@fortawesome/free-brands-svg-icons';

import styles from './styles.module.css';

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    });
  }

  render() {
    const { isOpen } = this.state;
    return (
      <Navbar className={styles.footer} expand="md">
        <Container>
          <NavbarBrand tag={RRNavLink} to="/landing" className={styles.logo}>
            <img
              alt="TKRtape Logo"
              src="/svg_css/Logo.svg"
              width="46"
              height="56"
              className="d-inline-block align-top mr-5"
            />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto">
              <NavItem>
                <NavLink tag={RRNavLink} className={styles.link} to="/contact">
                  Contact
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} className={styles.link} to="/terms">
                  Terms
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={RRNavLink}
                  className={styles.link}
                  to="/advertise"
                >
                  Advertise
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>

          <Nav>
            <NavItem className="social mr-5">
              <a href="#Instagram">
                <FontAwesomeIcon icon={faInstagram} size="3x" color="#EBEDEA" />
              </a>
            </NavItem>
            <NavItem className="social mr-5">
              <a href="#Twitter">
                <FontAwesomeIcon icon={faTwitter} size="3x" color="#EBEDEA" />
              </a>
            </NavItem>
            <NavItem className="social mr-5">
              <a href="#Facebook">
                <FontAwesomeIcon
                  icon={faFacebookSquare}
                  size="3x"
                  color="#EBEDEA"
                />
              </a>
            </NavItem>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}

export default Footer;
