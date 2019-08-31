import React from 'react';

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

import PortfolioPanel from '../../../elements/portfolioPanel';
import News from '../news';
import Journal from '../journal';
import Bookmark from '../bookmark';
import Settings from '../settings';

import { Route } from 'react-router-dom';
import { NavLink as RRNavLink } from 'react-router-dom';

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
    return (
      <div className="container-fluid">
        <Row>
          <Col md="4" className={styles.Navigation}>
            <Nav tabs className={styles.NavHeader}>
              <NavItem>
                <NavLink tag={RRNavLink} to="/">
                  <img
                    src="/svg_css/LogoInactive.svg"
                    alt="Home"
                    height="32"
                    width="32"
                  />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} onClick={this.toggle} to="/news/new">
                  <img
                    src="/svg_css/AddInactive.svg"
                    alt="Add"
                    height="32"
                    width="32"
                  />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to="/journal">
                  <img
                    src="/svg_css/JournalInactive.svg"
                    alt="Journal"
                    height="32"
                    width="32"
                  />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to="/bookmark">
                  <img
                    src="/svg_css/BookmarkInactive.svg"
                    alt="Bookmark"
                    height="32"
                    width="32"
                  />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to="/settings">
                  <img
                    src="/svg_css/UserInactive.svg"
                    alt="User"
                    height="32"
                    width="32"
                  />
                </NavLink>
              </NavItem>
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
              isOpen={this.state.modal}
              toggle={this.toggle}
              className={(this.props.className, styles.Modal)}
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
                </Button>{' '}
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
