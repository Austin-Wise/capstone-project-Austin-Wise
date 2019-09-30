/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import {
  Jumbotron,
  Row,
  Card,
  CardTitle,
  CardBody,
  CardText,
  CardFooter,
  Col,
  Spinner,
} from 'reactstrap';
import { Link, Route, Redirect } from 'react-router-dom';
import DeleteModal from '../../Shared/deleteModal';
import container from './container';
import styles from './styles.module.css';

class News extends Component {
  constructor(props) {
    super(props);
    const { match } = props;
    if (match.params.ticker && match.params.ticker !== 'new') this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    if (
      match.params.ticker !== prevProps.match.params.ticker &&
      match.params.ticker &&
      match.params.ticker !== 'new'
    ) {
      this.loadData();
    }
  }

  loadData = () => {
    const {
      fetchArticles,
      fetchCompanyData,
      fetchBookmarks,
      match,
    } = this.props;
    if (!match.params.ticker || match.params.ticker === 'new') return;
    fetchCompanyData(match.params.ticker);
    fetchArticles(match.params.ticker);
    fetchBookmarks();
  };

  createBookmarkFunc = articleId => () => {
    const {
      match: {
        params: { ticker },
      },
      createBookmark,
      articles,
    } = this.props;
    const article = articles.find(a => a.id === articleId);

    createBookmark({
      articleId,
      ticker,
      headline: article.headline,
      source: article.source,
      url: article.url,
      summary: article.summary,
      related: article.related,
      image: article.image,
      lang: article.lang,
    });
  };

  render() {
    const {
      companyData,
      articles,
      bookmarks,
      deleteBookmark,
      ticker,
      match,
      isLoading,
    } = this.props;
    if (match.params.ticker === undefined) {
      return (
        <>
          <h1>A Blank state</h1>
        </>
      );
    }
    if (
      !ticker.symbol &&
      match.params.ticker &&
      match.params.ticker !== 'new'
    ) {
      return <Redirect to="/" />;
    }
    if (match.params.ticker === 'new') {
      return null;
    }

    return (
      <Col md="8" className={styles.News}>
        <Jumbotron className={styles.Jumbo}>
          <Row>
            <div className="ml-5">
              <h2>{companyData.ticker}</h2>
              <h3>{companyData.name}</h3>
            </div>
            <h4>
              <span className={styles.dollar}>{companyData.price}</span>
              <span className={styles.dollar}>{companyData.dayChange}</span>
              <span className={styles.percent}>{companyData.chgPct}%</span>
              <img
                className="ml-5"
                src={
                  companyData.dayChange &&
                  companyData.dayChange.indexOf('-') === -1
                    ? '/svg_css/greenArrow.svg'
                    : '/svg_css/redArrow.svg'
                }
                alt={
                  companyData.dayChange &&
                  companyData.dayChange.indexOf('-') === -1
                    ? 'green arrow'
                    : 'red arrow'
                }
                height="27.29px"
                width="32px"
              />
            </h4>
          </Row>
          <Row className="mt-5">
            <Col md="4">
              <ul className={styles.CoList}>
                <li>
                  CEO:&nbsp;
                  <span className={styles.coData}>{companyData.ceo}</span>
                </li>
                <li>
                  Employees:&nbsp;
                  <span className={styles.coData}>{companyData.employees}</span>
                </li>
                <li>
                  Industry Group:&nbsp;
                  <span className={styles.coData}>{companyData.industry}</span>
                </li>
                <li>
                  Location:&nbsp;
                  <span className={styles.coData}>{companyData.location}</span>
                </li>
              </ul>
            </Col>
            <Col md="4">
              <ul className={styles.CoList}>
                <li>
                  Open:&nbsp;
                  <span className={styles.coData}>{companyData.open}</span>
                </li>
                <li>
                  High:&nbsp;
                  <span className={styles.coData}>{companyData.high}</span>
                </li>
                <li>
                  Low:&nbsp;
                  <span className={styles.coData}>{companyData.low}</span>
                </li>
                <li>
                  Close:&nbsp;
                  <span className={styles.coData}>{companyData.close}</span>
                </li>
                <li>
                  Volume:&nbsp;
                  <span className={styles.coData}>{companyData.volume}</span>
                </li>
              </ul>
            </Col>
            <Col md="4">
              <ul className={styles.CoList}>
                <li>
                  Stock Exchange:&nbsp;
                  <span className={styles.coData}>{companyData.exchange}</span>
                </li>
                <li>
                  52-Week High:&nbsp;
                  <span className={styles.coData}>{companyData.yearHigh}</span>
                </li>
                <li>
                  52-Week Low:&nbsp;
                  <span className={styles.coData}>{companyData.yearLow}</span>
                </li>
                <li>
                  Shares:&nbsp;
                  <span className={styles.coData}>{companyData.shares}</span>
                </li>
                <li>
                  Market Cap:&nbsp;
                  <span className={styles.coData}>{companyData.mktCap}</span>
                </li>
              </ul>
            </Col>
          </Row>
        </Jumbotron>
        <Row className="d-flex justify-content-center">
          {isLoading > Date.now() + 500 && <Spinner color="warning" />}
          {articles.map(article => {
            const bookmark = bookmarks.find(
              mark => mark.articleId === article.id.toString()
            );
            const date = new Date(article.id);
            const DateString = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
            return (
              <Card key={article.id} className="col-md-5 p-0 m-4">
                <CardBody className={styles.Card}>
                  <Row>
                    <Col md="10">
                      <CardTitle onClick={() => window.open(article.url)}>
                        {article.headline}
                      </CardTitle>
                    </Col>
                    <Col md="2">
                      {bookmark ? (
                        <Link
                          to={`/news/${match.params.ticker}/deleteBookmark/${bookmark.id}`}
                          className={styles.Bookmark}
                          aria-labelledby="Bookmark Active"
                        >
                          X
                        </Link>
                      ) : (
                        <button
                          type="button"
                          className={styles.BookmarkInactive}
                          aria-labelledby="Bookmark Inactive"
                          onClick={this.createBookmarkFunc(article.id)}
                        />
                      )}
                    </Col>
                  </Row>
                  <CardText className={styles.cardText}>
                    {article.summary}
                  </CardText>
                  <img
                    src="/svg_css/scale-0.svg"
                    alt="Scale Placeholder"
                    className={styles.AnImage}
                  />
                </CardBody>
                <CardFooter>
                  Published on {DateString} by &apos;{article.source}
                  &apos;
                </CardFooter>
              </Card>
            );
          })}
        </Row>
        <Route
          path="/news/:ticker/deleteBookmark/:id"
          exact
          render={routeProps => (
            <DeleteModal deleteFunc={deleteBookmark} {...routeProps} />
          )}
        />
      </Col>
    );
  }
}

export default container(News);

News.defaultProps = {
  companyData: {},
  news: [],
  ticker: {},
  articles: [],
  isLoading: Date.now(),
};

News.propTypes = {
  companyData: PropTypes.shape({
    name: PropTypes.string,
    ticker: PropTypes.string,
    ceo: PropTypes.string,
    employees: PropTypes.number,
    industry: PropTypes.string,
    location: PropTypes.string,
    open: PropTypes.string,
    high: PropTypes.string,
    low: PropTypes.string,
    close: PropTypes.string,
    volume: PropTypes.string,
    exchange: PropTypes.string,
    yearHigh: PropTypes.string,
    yearLow: PropTypes.string,
    shares: PropTypes.string,
    mktCap: PropTypes.string,
    chgPct: PropTypes.string,
    dayChange: PropTypes.string,
    price: PropTypes.string,
  }),
  news: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      headline: PropTypes.string,
      source: PropTypes.string,
      url: PropTypes.string,
      summary: PropTypes.string,
      related: PropTypes.string,
      image: PropTypes.string,
      lang: PropTypes.string,
    })
  ),
  ticker: PropTypes.shape({
    symbol: PropTypes.string,
  }),
  isLoading: PropTypes.bool,
  match: ReactRouterPropTypes.match.isRequired,
  articles: PropTypes.arrayOf(PropTypes.object),
  bookmarks: PropTypes.func.isRequired,
  deleteBookmark: PropTypes.func.isRequired,
  fetchArticles: PropTypes.func.isRequired,
  fetchCompanyData: PropTypes.func.isRequired,
  fetchBookmarks: PropTypes.func.isRequired,
  createBookmark: PropTypes.func.isRequired,
};
