import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Jumbotron,
  Row,
  Card,
  CardTitle,
  CardBody,
  CardText,
  CardFooter,
  Col
} from 'reactstrap';

import styles from './styles.module.css';

export default class News extends Component {
  render() {
    const { company, news } = this.props;
    return (
      <Col md="8">
        <Jumbotron>
          <Row>
            <div className="ml-5">
              <h2>{company.ticker}</h2>
              <h3>{company.name}</h3>
            </div>
            <h4>
              <span className={styles.dollar}>
                {company.now > company.close
                  ? `$${(company.now - company.close).toFixed(2)}`
                  : (company.now - company.close)
                      .toFixed(2)
                      .replace(/-/g, '-$')}
              </span>
              <span className={styles.percent}>
                {company.now > company.close
                  ? `${((company.now / company.close) * 100 - 100).toFixed(2)}`
                  : ((company.close / company.now) * 100 - 100).toFixed(2)}
                %
              </span>
              <img
                className="ml-5"
                src={
                  company.now > company.close
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
            </h4>
          </Row>
          <Row className="mt-5">
            <Col md="4">
              <ul className={styles.CoList}>
                <li>
                  CEO: <span className={styles.coData}>{company.ceo}</span>
                </li>
                <li>
                  Employees:
                  <span className={styles.coData}>{company.employees}</span>
                </li>
                <li>
                  Industry Group:
                  <span className={styles.coData}>{company.industry}</span>
                </li>
                <li>
                  Location:
                  <span className={styles.coData}>{company.location}</span>
                </li>
              </ul>
            </Col>
            <Col md="4">
              <ul className={styles.CoList}>
                <li>
                  Open: <span className={styles.coData}>{company.open}</span>
                </li>
                <li>
                  High: <span className={styles.coData}>{company.high}</span>
                </li>
                <li>
                  Low: <span className={styles.coData}>{company.low}</span>
                </li>
                <li>
                  Close: <span className={styles.coData}>{company.close}</span>
                </li>
                <li>
                  Volume:{' '}
                  <span className={styles.coData}>{company.volume}</span>
                </li>
              </ul>
            </Col>
            <Col md="4">
              <ul className={styles.CoList}>
                <li>
                  Adj. Open:{' '}
                  <span className={styles.coData}>{company.adjOpen}</span>
                </li>
                <li>
                  Adj. High:{' '}
                  <span className={styles.coData}>{company.adjHigh}</span>
                </li>
                <li>
                  Adj. Low:{' '}
                  <span className={styles.coData}>{company.adjLow}</span>
                </li>
                <li>
                  Adj. Close:{' '}
                  <span className={styles.coData}>{company.adjClose}</span>
                </li>
                <li>
                  Adj. Volume:{' '}
                  <span className={styles.coData}>{company.adjVolume}</span>
                </li>
              </ul>
            </Col>
          </Row>
        </Jumbotron>
        <Row>
          <Col md="6">
            <Card>
              <CardBody>
                <CardTitle>Card title</CardTitle>
                <CardText>Card content</CardText>
              </CardBody>
              <CardFooter>Card content</CardFooter>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <CardBody>
                <CardTitle>Card title</CardTitle>
                <CardText>Card content</CardText>
              </CardBody>
              <CardFooter>Card content</CardFooter>
            </Card>
          </Col>
        </Row>
      </Col>
    );
  }
}

News.defaultProps = {
  company: {
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
  news: [
    {
      title:
        'Google’s report on massive iPhone security flaw doubles as dig against Apple’s privacy stance',
      text:
        'Google has released a compilation of in-depth research on vulnerabilities in Apple’s iPhone operating system.',
      source: 'CNBC',
      published: '22/05/2001',
      rating: -0.2,
      id: '291m2fq3'
    },
    {
      title:
        'Google’s report on massive iPhone security flaw doubles as dig against Apple’s privacy stance',
      text:
        'Google has released a compilation of in-depth research on vulnerabilities in Apple’s iPhone operating system.',
      source: 'CNBC',
      published: '22/05/2001',
      rating: -0.2,
      id: '291m2fq3'
    },
    {
      title:
        'Google’s report on massive iPhone security flaw doubles as dig against Apple’s privacy stance',
      text:
        'Google has released a compilation of in-depth research on vulnerabilities in Apple’s iPhone operating system.',
      source: 'CNBC',
      published: '22/05/2001',
      rating: -0.2,
      id: '291m2fq3'
    },
    {
      title:
        'Google’s report on massive iPhone security flaw doubles as dig against Apple’s privacy stance',
      text:
        'Google has released a compilation of in-depth research on vulnerabilities in Apple’s iPhone operating system.',
      source: 'CNBC',
      published: '22/05/2001',
      rating: -0.2,
      id: '291m2fq3'
    }
  ]
};

News.propTypes = {
  company: PropTypes.shape({
    name: PropTypes.string,
    ticker: PropTypes.string,
    ceo: PropTypes.string,
    employees: PropTypes.number,
    industry: PropTypes.string,
    location: PropTypes.string,
    open: PropTypes.number,
    high: PropTypes.number,
    low: PropTypes.number,
    adjClose: PropTypes.number,
    adjOpen: PropTypes.number,
    adjHigh: PropTypes.number,
    adjLow: PropTypes.number,
    adjClose: PropTypes.number,
    adjVolume: PropTypes.number,
    now: PropTypes.number
  }),
  news: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      text: PropTypes.string,
      source: PropTypes.string,
      published: PropTypes.instanceOf(Date),
      rating: PropTypes.number,
      id: PropTypes.string
    })
  )
};
