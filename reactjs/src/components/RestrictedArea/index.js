/* eslint-disable react/prop-types */
/* eslint-disable no-return-assign */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Nav, NavItem, Col, Row } from 'reactstrap';
import { Route, Switch, NavLink as RRNavLink } from 'react-router-dom';
import container from './container';
import PortfolioPanel from './portfolioPanel';
import News from './news';
import Journal from './journal';
import Bookmark from './bookmark';
import Settings from './settings';
import NotFound from '../Shared/notFound';

import styles from './styles.module.css';
import TickerModal from './tickerModal';

// eslint-disable-next-line react/prefer-stateless-function
class UserArea extends React.Component {
  // Match url always matches "/", moving the "/" to the end of the array for route wildcards allows for if/else checking on route alternatives

  render() {
    const { navigation, match, logout } = this.props;
    return (
      <div className="container-fluid">
        <Row>
          <Col md="4" className={styles.Navigation}>
            <Nav tabs className={styles.NavHeader}>
              {navigation.map(link => {
                const path =
                  link.path === '/news/new'
                    ? `/news/${match.params.ticker || 'new'}/new`
                    : link.path;
                return (
                  <NavItem key={link.name}>
                    <NavLink
                      tag={RRNavLink}
                      to={path}
                      activeStyle={{
                        backgroundImage: `url(/svg_css/${link.name}.svg)`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        height: '32px',
                        width: '32px',
                        border: 'none',
                      }}
                      style={{
                        backgroundImage: `url(/svg_css/${link.name}Inactive.svg)`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        height: '32px',
                        width: '32px',
                      }}
                    />
                  </NavItem>
                );
              })}
            </Nav>
            <Route
              path={[
                '/news/:ticker',
                '/journal',
                '/bookmark',
                '/settings',
                '/',
              ]}
              component={PortfolioPanel}
            />
            <Nav className={styles.footer}>
              <NavItem>
                <NavLink active href="/">
                  <button type="button" onClick={logout}>
                    Log Out
                  </button>
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

          <Route path="/news/:ticker/new" component={TickerModal} />
          <Switch>
            <Route path="/" exact component={News} />
            <Route path="/news/:ticker" component={News} />
            <Route path="/journal" component={Journal} />
            <Route path="/bookmark" component={Bookmark} />
            <Route path="/settings" component={Settings} />
            <Route path="/" component={NotFound} />
          </Switch>
        </Row>
      </div>
    );
  }
}
export default container(UserArea);

UserArea.propTypes = {
  navigation: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      to: PropTypes.string,
      imgSrc: PropTypes.string,
    })
  ),
};

UserArea.defaultProps = {
  navigation: [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Add',
      path: '/news/new',
    },
    {
      name: 'Journal',
      path: '/journal',
    },
    {
      name: 'Bookmark',
      path: '/bookmark',
    },
    {
      name: 'Settings',
      path: '/settings',
    },
  ],
};
