/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { Route, Link, NavLink as RRNavLink, Redirect } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';

import { NavLink, Nav, NavItem } from 'reactstrap';

import container from './container';
import styles from './styles.module.css';
import DeleteModal from '../../Shared/deleteModal';

class PortfolioPanel extends Component {
  constructor(props) {
    super(props);
    this.loadData();
  }

  loadData = async () => {
    const { fetchTickers } = this.props;
    await fetchTickers();
    const { tickers, fetchCompanyData } = this.props;
    tickers.forEach(ticker => {
      fetchCompanyData(ticker.symbol);
    });
  };

  render() {
    const { tickers, deleteTicker, match } = this.props;
    if (match.url === '/' && tickers[0])
      return <Redirect to={`/news/${tickers[0].symbol}`} />;
    return (
      <Nav vertical pills className={('flex-column', styles.mainNav)}>
        <NavItem className={styles.sectionHeader}>
          <h2>Portfolio</h2>
        </NavItem>
        {tickers.map(ticker => (
          <NavItem key={ticker.id} id>
            <NavLink tag={RRNavLink} exact to={`/news/${ticker.symbol}`}>
              <div className={styles.item}>
                <h3>{ticker.symbol}</h3>
                <p>
                  {ticker.now > ticker.close
                    ? `$${(ticker.now - ticker.close).toFixed(2)}`
                    : (ticker.now - ticker.close)
                      .toFixed(2)
                      .replace(/-/g, '-$')}
                </p>
                <img
                  src={
                    ticker.now > ticker.close
                      ? '/svg_css/greenArrow.svg'
                      : '/svg_css/redArrow.svg'
                  }
                  alt="{
                (ticker.now > ticker.close)
                    ? 'green arrow'
                    : 'red arrow'
                }"
                  height="27.29px"
                  width="32px"
                />
                <Link to={`${match.url}/delete_ticker/${ticker.id}`}>X</Link>
              </div>
            </NavLink>
          </NavItem>
        ))}
        {/* // ? delete modal */}
        <Route
          path={`${match.url}/delete_ticker/:id`}
          exact
          render={routeProps => (
            <DeleteModal deleteFunc={deleteTicker} {...routeProps} />
          )}
        />
      </Nav>
    );
  }
}

export default container(PortfolioPanel);

PortfolioPanel.propTypes = {
  tickers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      symbol: PropTypes.string,
      ceo: PropTypes.string,
      employees: PropTypes.number,
      industry: PropTypes.string,
      location: PropTypes.string,
      open: PropTypes.number,
      high: PropTypes.number,
      low: PropTypes.number,
      volume: PropTypes.number,
      adjopen: PropTypes.number,
      adjhigh: PropTypes.number,
      adjlow: PropTypes.number,
      adjclose: PropTypes.number,
      adjVolume: PropTypes.number,
      now: PropTypes.number
    })
  ),
  history: ReactRouterPropTypes.history.isRequired,
  fetchTickers: PropTypes.func.isRequired,
  deleteTicker: PropTypes.func.isRequired,
  fetchCompanyData: PropTypes.func.isRequired,
  match: ReactRouterPropTypes.match.isRequired
};

PortfolioPanel.defaultProps = {
  tickers: []
};
