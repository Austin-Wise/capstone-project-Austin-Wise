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
  Col
} from 'reactstrap';
import { Link, Route } from 'react-router-dom';
import DeleteModal from '../../Shared/deleteModal';
import container from './container';
import styles from './styles.module.css';

class News extends Component {
  constructor(props) {
    super(props);
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    if (match.params.ticker !== prevProps.match.params.ticker) {
      this.loadData();
    }
  }

  loadData = () => {
    const {
      fetchArticles,
      fetchCompanyData,
      fetchBookmarks,
      createBookmark,
      match
    } = this.props;
    fetchCompanyData(match.params.ticker);
    fetchArticles(match.params.ticker);
    fetchBookmarks();
  };

  createBookmarkFunc = articleId => () => {
    const {
      match: {
        params: { ticker }
      },
      createBookmark
    } = this.props;

    createBookmark({
      articleId,
      ticker
    });
  };

  render() {
    const { companyData, articles, bookmarks, deleteBookmark } = this.props;
    return (
      <Col md="8" className={styles.News}>
        <Jumbotron className={styles.Jumbo}>
          <Row>
            <div className="ml-5">
              <h2>{companyData.ticker}</h2>
              <h3>{companyData.name}</h3>
            </div>
            <h4>
              <span className={styles.dollar}>
                {companyData.now > companyData.close &&
                  `$${(companyData.now - companyData.close).toFixed(2)}`}
                {companyData.now < companyData.close &&
                  (companyData.now - companyData.close)
                    .toFixed(2)
                    .replace(/-/g, '-$')}
              </span>
              <span className={styles.percent}>
                {companyData.now > companyData.close &&
                  `${(
                    (companyData.now / companyData.close) * 100 -
                    100
                  ).toFixed(2)}`}
                {companyData.now < companyData.close &&
                  ((companyData.close / companyData.now) * 100 - 100).toFixed(
                    2
                  )}
                %
              </span>
              <img
                className="ml-5"
                src={
                  companyData.now > companyData.close
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
                  Adj. Open:&nbsp;
                  <span className={styles.coData}>{companyData.adjOpen}</span>
                </li>
                <li>
                  Adj. High:&nbsp;
                  <span className={styles.coData}>{companyData.adjHigh}</span>
                </li>
                <li>
                  Adj. Low:&nbsp;
                  <span className={styles.coData}>{companyData.adjLow}</span>
                </li>
                <li>
                  Adj. Close:&nbsp;
                  <span className={styles.coData}>{companyData.adjClose}</span>
                </li>
                <li>
                  Adj. Volume:&nbsp;
                  <span className={styles.coData}>{companyData.adjVolume}</span>
                </li>
              </ul>
            </Col>
          </Row>
        </Jumbotron>
        <Row className="d-flex justify-content-center">
          {articles.map(article => {
            const bookmark = bookmarks.find(
              mark => mark.articleId === article.id
            );
            return (
              <Card key={article.id} className="col-md-5 p-0 m-4">
                <CardBody className={styles.Card}>
                  <Row>
                    <Col md="10">
                      <CardTitle>{article.title}</CardTitle>
                    </Col>
                    <Col md="2">
                      {bookmark ? (
                        <Link
                          to={`/news/deleteBookmark/${bookmark.id}`}
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
                    {article.text}
                  </CardText>
                  <img
                    src="/svg_css/scale-0.svg"
                    alt="Scale Placeholder"
                    className={styles.AnImage}
                  />
                </CardBody>
                <CardFooter>
                  Published on {article.published} by &apos;{article.source}
                  &apos;
                </CardFooter>
              </Card>
            );
          })}
        </Row>
        <Route
          path="/news/deleteBookmark/:id"
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
  news: []
};

News.propTypes = {
  companyData: PropTypes.shape({
    name: PropTypes.string,
    ticker: PropTypes.string,
    ceo: PropTypes.string,
    employees: PropTypes.number,
    industry: PropTypes.string,
    location: PropTypes.string,
    open: PropTypes.number,
    high: PropTypes.number,
    low: PropTypes.number,
    close: PropTypes.number,
    volume: PropTypes.number,
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
  ),
  match: ReactRouterPropTypes.match.isRequired,
  articles: PropTypes.func.isRequired,
  bookmarks: PropTypes.func.isRequired,
  deleteBookmark: PropTypes.func.isRequired,
  fetchArticles: PropTypes.func.isRequired,
  fetchCompanyData: PropTypes.func.isRequired,
  fetchBookmarks: PropTypes.func.isRequired,
  createBookmark: PropTypes.func.isRequired
};
