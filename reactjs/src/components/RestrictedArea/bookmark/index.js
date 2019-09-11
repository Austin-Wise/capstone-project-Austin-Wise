/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Row,
  Card,
  CardTitle,
  CardBody,
  CardText,
  CardFooter,
  Col,
  Modal,
  ModalHeader,
  ModalFooter,
  Button,
  NavItem
} from 'reactstrap';
import { Route, Link, NavLink as RRNavLink } from 'react-router-dom';
import container from './container';
import NotesModal from '../notes';
import DeleteModal from '../../Shared/deleteModal';
import styles from './styles.module.css';

class Bookmark extends Component {
  constructor(props) {
    super(props);
    this.loadData();
  }

  loadData = async () => {
    const { fetchBookmarks } = this.props;
    await fetchBookmarks();
    const { bookmarks, fetchArticle } = this.props;
    bookmarks.forEach(bookmark => {
      fetchArticle(bookmark.articleId);
    });
  };

  render() {
    const { bookmarks, deleteBookmark } = this.props;
    return (
      <Col md="8">
        <Row className="d-flex justify-content-center">
          {bookmarks.map(bookmark => (
            <Card key={bookmark.id} className="col-md-5 p-0 m-4">
              <CardBody className={styles.Card}>
                <Row>
                  <Col md="10">
                    <CardTitle>{bookmark.article.title}</CardTitle>
                  </Col>
                  <Col md="2">
                    <Link
                      to={`/bookmark/delete/${bookmark.id}`}
                      className={styles.Bookmark}
                      aria-labelledby="bookmark"
                    >
                      X
                    </Link>
                  </Col>
                </Row>
                <CardText className={styles.cardText}>
                  {bookmark.article.text}
                </CardText>
                <img
                  src="/svg_css/scale-0.svg"
                  alt="Scale Placeholder"
                  className={styles.AnImage}
                />
                <NavItem
                  className={('mr-5', styles.loginItem)}
                  tag={RRNavLink}
                  to="/:bookmarkId/note/:noteId"
                  exact
                >
                  <img src="/svg_css/pencilEmpty.svg" alt="Notes Icon" />
                </NavItem>
              </CardBody>
              <CardFooter>
                Published on {bookmark.article.published} by &apos;
                {bookmark.article.source}
                &apos;
              </CardFooter>
            </Card>
          ))}
        </Row>
        {/* // ? new modal */}
        <Route path="/:bookmarkId/note/new" exact component={NotesModal} />
        {/* // ? existing modal */}
        <Route path="/:bookmarkId/note/:noteId" exact component={NotesModal} />
        <Route
          path="/bookmark/delete/:id"
          exact
          render={routeProps => (
            <DeleteModal deleteFunc={deleteBookmark} {...routeProps} />
          )}
        />
      </Col>
    );
  }
}

export default container(Bookmark);

Bookmark.defaultProps = {
  bookmarks: []
};

Bookmark.propTypes = {
  bookmarks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      articleId: PropTypes.string,
      ticker: PropTypes.string,
      userId: PropTypes.string,
      article: PropTypes.shape({
        title: PropTypes.string,
        text: PropTypes.string,
        published: PropTypes.instanceOf(Date),
        source: PropTypes.string
      })
    })
  ),
  fetchBookmarks: PropTypes.func.isRequired,
  deleteBookmark: PropTypes.func.isRequired,
  fetchArticle: PropTypes.func.isRequired
};
