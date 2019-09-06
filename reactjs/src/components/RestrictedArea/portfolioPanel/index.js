import React from 'react';

import PropTypes from 'prop-types';

import { NavLink, Nav, NavItem } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import styles from './styles.module.css';

const PortfolioPanel = props => {
  const { tickers } = props;
  return (
    <Nav vertical pills className={('flex-column', styles.mainNav)}>
      {tickers.map(item => (
        <NavItem>
          <NavLink tag={RRNavLink} exact to="/news/{item.ticker}">
            <div className={styles.item}>
              <h3>{item.ticker}</h3>
              <p>
                {item.now > item.close
                  ? `$${(item.now - item.close).toFixed(2)}`
                  : (item.now - item.close).toFixed(2).replace(/-/g, '-$')}
              </p>
              <img
                src={
                  item.now > item.close
                    ? '/svg_css/greenArrow.svg'
                    : '/svg_css/redArrow.svg'
                }
                alt="{
                (item.now > item.close)
                    ? 'green arrow'
                    : 'red arrow'
                }"
                height="27.29px"
                width="32px"
              />
            </div>
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );
};

export default PortfolioPanel;

PortfolioPanel.propTypes = {
  tickers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      ticker: PropTypes.string,
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
  )
};

PortfolioPanel.defaultProps = {
  tickers: [
    {
      name: 'Alphabet Inc Class A',
      ticker: 'GOOGL',
      ceo: 'Larry Page',
      employees: 98771,
      industry: 'Software and Data',
      location: 'Mountain View, CA',
      open: 1185.17,
      high: 1195.67,
      low: 1150.0,
      close: 1153.58,
      volume: 1508729,
      adjOpen: 1185.17,
      adjHigh: 1195.67,
      adjLow: 1150.0,
      adjClose: 1153.58,
      adjVolume: 1508729,
      now: 1195.67
    },
    {
      name: 'Apple, Inc.',
      ticker: 'AAPL',
      ceo: 'Tim Cook',
      employees: 132923,
      industry: 'Computing Systems',
      location: 'Cupertino, CA',
      open: 1185.17,
      high: 1195.67,
      low: 1150.0,
      close: 1153.58,
      volume: 1508729,
      adjOpen: 1185.17,
      adjHigh: 1195.67,
      adjLow: 1150.0,
      adjClose: 1153.58,
      adjVolume: 1508729,
      now: 1010.67
    },
    {
      name: 'PurAqua',
      ticker: 'PUR',
      ceo: 'Posseidon',
      employees: 1,
      industry: 'Beverage',
      location: 'Aegean Sea, Euboea',
      open: 2.17,
      high: 2.31,
      low: 2.03,
      close: 2.19,
      volume: 153873,
      adjOpen: 1185.17,
      adjHigh: 1195.67,
      adjLow: 1150.0,
      adjClose: 1153.58,
      adjVolume: 1508729,
      now: 1135.67
    }
  ]
};
