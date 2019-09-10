import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {
  NavLink,
  Nav,
  NavItem,
  Modal,
  ModalHeader,
  ModalFooter,
  Button
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import container from './container';
import styles from './styles.module.css';

class PortfolioPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
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

  toggle = id => () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
      id
    }));
  };

  deleteTickerFunc = async () => {
    const { deleteTicker } = this.props;
    const { id } = this.state;
    await deleteTicker(id);
    this.toggle()();
  };

  render() {
    const { tickers } = this.props;
    const { modal, isOpen } = this.state;
    console.log(tickers);
    return (
      <Nav vertical pills className={('flex-column', styles.mainNav)}>
        <NavItem className={styles.sectionHeader}>
          <h2>Portfolio</h2>
        </NavItem>
        {tickers.map(ticker => (
          <NavItem key={ticker.id} id>
            <NavLink tag={RRNavLink} exact to={`/news/${ticker.ticker}`}>
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
              </div>
              <button
                className={styles.RemoveTicker}
                type="button"
                aria-labelledby="Remove Ticker"
                onClick={this.toggle(ticker.id)}
              />
            </NavLink>
          </NavItem>
        ))}
        <div>
          <Modal isOpen={isOpen} toggle={this.toggle} className={styles.Modal}>
            <ModalHeader className={styles.ModalHeader} toggle={this.toggle()}>
              Are you sure?
            </ModalHeader>
            <ModalFooter>
              <Button color="danger" onClick={this.toggle()}>
                No,Cancel
              </Button>
              <Button color="primary" onClick={this.deleteTickerFunc}>
                Yes, Delete
              </Button>
            </ModalFooter>
          </Modal>
        </div>
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
  ),
  fetchTickers: PropTypes.func.isRequired,
  deleteTicker: PropTypes.func.isRequired,
  fetchCompanyData: PropTypes.func.isRequired
};

PortfolioPanel.defaultProps = {
  tickers: []
};
