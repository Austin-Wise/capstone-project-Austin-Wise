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
import { Route } from 'react-router-dom';
import { NavLink as RRNavLink } from 'react-router-dom';

import { LoginModal, RegisterModal } from '../AuthModals';

import styles from './styles.module.css';

class MediaBlock extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <React.Fragment>
        <header>
          <Navbar className={styles.loginOptions} expand="md">
            <Container className="mt-5">
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
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
            <video autoPlay loop className={styles.media}>
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
      </React.Fragment>
    );
  }
}

export default MediaBlock;
