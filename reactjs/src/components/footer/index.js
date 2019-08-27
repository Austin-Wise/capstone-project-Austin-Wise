import React from 'react';
import { Navbar, NavbarBrand, NavLink, Nav, NavItem } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faInstagram
} from '@fortawesome/free-brands-svg-icons';

import styles from './styles.module.css';

const Footer = () => {
  return (
    <>
      <Navbar>
        <NavbarBrand tag={RRNavLink} to="/landing" className={styles.logo}>
          <img
            alt="TKRtape Logo"
            src="https://via.placeholder.com/46x56?text=Visit+Blogging.com+Now"
            width="46"
            height="56"
            className="d-inline-block align-top"
          />
        </NavbarBrand>
        <Nav>
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
            <NavLink tag={RRNavLink} className={styles.link} to="/advertise">
              Advertise
            </NavLink>
          </NavItem>
        </Nav>
        <Nav>
          <NavItem>
            <a href="#Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </NavItem>
          <NavItem>
            <a href="#Twitter">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </NavItem>
          <NavItem>
            <a href="#Facebook">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
          </NavItem>
        </Nav>
      </Navbar>
    </>
  );
};

export default Footer;
