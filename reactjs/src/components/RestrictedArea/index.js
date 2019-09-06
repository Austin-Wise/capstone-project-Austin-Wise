/* eslint-disable no-return-assign */
import React from 'react';

import PropTypes from 'prop-types';

import {
  NavLink,
  Nav,
  NavItem,
  Col,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input
} from 'reactstrap';

import { Route, NavLink as RRNavLink } from 'react-router-dom';

import PortfolioPanel from './portfolioPanel';
import News from './news';
import Journal from './journal';
import Bookmark from './bookmark';
import Settings from './settings';

import styles from './styles.module.css';

export default class UserArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    const { className } = this.props;
    const { modal } = this.state;
    return (
      <div className="container-fluid">
        <Row>
          <Col md="4" className={styles.Navigation}>
            <Nav tabs className={styles.NavHeader}>
              {navigation.map(link => (
                <NavItem>
                  <NavLink
                    tag={RRNavLink}
                    to={link.to}
                    activeStyle={{
                      backgroundImage: `/svg_css/${link.name}.svg`,
                      height: '32px',
                      width: '32px',
                      backgroundPosition: 'center'
                    }}
                    style={{
                      backgroundImage: `/svg_css/${link.name}Inactive.svg`,
                      height: '32px',
                      width: '32px',
                      backgroundPosition: 'center'
                    }}
                  />
                </NavItem>
              ))}
            </Nav>
            <PortfolioPanel />
            <Nav>
              <NavItem>
                <NavLink active href="#">
                  Log Out
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Contact</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Terms</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Advertise</NavLink>
              </NavItem>
            </Nav>
          </Col>
          <div>
            <Modal
              isOpen={modal}
              toggle={this.toggle}
              className={(className, styles.Modal)}
            >
              <ModalHeader className={styles.ModalHeader} toggle={this.toggle}>
                New Feed
              </ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  id="newFeed"
                  name="newFeed"
                  placeholder="Ticker Symbol"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={this.toggle}>
                  Cancel
                </Button>
                <Button color="primary" onClick={this.toggle}>
                  Save
                </Button>
              </ModalFooter>
            </Modal>
          </div>
          <Route path="/" component={News} />
          <Route path="/news" component={News} />
          <Route path="/journal" component={Journal} />
          <Route path="/bookmark" component={Bookmark} />
          <Route path="/settings" component={Settings} />
        </Row>
      </div>
    );
  }
}

UserArea.propTypes = {
  className: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    name: PropTypes.string,
    to: PropTypes.string,
    imgSrc: PropTypes.string
  })
};

UserArea.defaultProps = {
  navigation: [
    {
      name: 'Home',
      path: '/'
    },
    {
      name: 'Add',
      path: '/news/new'
    },
    {
      name: 'Journal',
      path: '/journal'
    },
    {
      name: 'Bookmark',
      path: '/bookmark'
    },
    {
      name: 'Settings',
      path: '/settings'
    }
  ]
};
