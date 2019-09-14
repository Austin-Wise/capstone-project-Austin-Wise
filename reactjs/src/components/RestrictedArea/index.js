/* eslint-disable react/prop-types */
/* eslint-disable no-return-assign */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Nav, NavItem, Col, Row } from 'reactstrap';
import { Route, NavLink as RRNavLink } from 'react-router-dom';

import PortfolioPanel from './portfolioPanel';
import News from './news';
import Journal from './journal';
import Bookmark from './bookmark';
import Settings from './settings';

import styles from './styles.module.css';
import TickerModal from './tickerModal';

export default class UserArea extends React.Component {
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

  // Match url always matches "/", moving the "/" to the end of the array for route wildcards allows for if/else checking on route alternatives

  render() {
    const { navigation, match } = this.props;
    const { isOpen } = this.state;
    return (
      <div className="container-fluid">
        <Row>
          <Col md="4" className={styles.Navigation}>
            <Nav tabs className={styles.NavHeader}>
              {navigation.map(link => (
                <NavItem key={link.name}>
                  <NavLink
                    tag={RRNavLink}
                    to={link.path}
                    activeStyle={{
                      backgroundImage: `url(/svg_css/${link.name}.svg)`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'contain',
                      height: '32px',
                      width: '32px',
                      border: 'none'
                    }}
                    style={{
                      backgroundImage: `url(/svg_css/${link.name}Inactive.svg)`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'contain',
                      height: '32px',
                      width: '32px'
                    }}
                  />
                </NavItem>
              ))}
            </Nav>
            <Route
              path={[
                '/news/:ticker',
                '/journal',
                '/bookmark',
                '/settings',
                '/'
              ]}
              component={PortfolioPanel}
            />
            <Nav className={styles.footer}>
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
          <Route path="/" exact component={News} />
          <Route path="/news/:ticker" component={News} />
          <Route path="/news/new" component={TickerModal} />
          <Route path="/journal" component={Journal} />
          <Route path="/bookmark" component={Bookmark} />
          <Route path="/settings" component={Settings} />
        </Row>
      </div>
    );
  }
}

UserArea.propTypes = {
  navigation: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      to: PropTypes.string,
      imgSrc: PropTypes.string
    })
  )
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
