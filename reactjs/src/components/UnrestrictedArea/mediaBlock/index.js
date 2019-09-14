/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';

import {
  Navbar,
  Collapse,
  NavbarToggler,
  Nav,
  NavItem,
  Container
} from 'reactstrap';
import { Route, NavLink as RRNavLink } from 'react-router-dom';

import LoginModal from '../AuthModals/login';
import RegisterModal from '../AuthModals/register';

import styles from './styles.module.css';

class MediaBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  render() {
    const { isOpen } = this.state;
    return (
      <>
        <header>
          <Navbar className={styles.loginOptions} expand="md">
            <Container className="mt-5">
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto">
                  <NavItem
                    className={('mr-5', styles.loginItem)}
                    tag={RRNavLink}
                    to="/login"
                    exact
                  >
                    Login
                  </NavItem>
                  <NavItem
                    className={('mr-5', styles.loginItem)}
                    tag={RRNavLink}
                    to="/register"
                    exact
                  >
                    Register
                  </NavItem>
                </Nav>
              </Collapse>
            </Container>
          </Navbar>
          <section>
            <video autoPlay loop className={styles.media} aria-hidden="true">
              <source src="/busyroad.mp4" type="video/mp4" />
            </video>
            <Container className={styles.banner}>
              <img alt="TKRtape Logo" src="/svg_css/Logo+Text.svg" />
              <h2 className={styles.bannerText}>
                Research
                <br />
                More
                <br />
                <span>(in less time)</span>
              </h2>
              <img
                alt="Scroll Down"
                src="/svg_css/redArrow.svg"
                height="48"
                width="58"
              />
            </Container>
          </section>
          <Route path="/login" component={LoginModal} />
          <Route path="/register" component={RegisterModal} />
        </header>
      </>
    );
  }
}

export default MediaBlock;
