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
  NavItem,
} from 'reactstrap';
import { Route, Link, NavLink as RRNavLink, Switch } from 'react-router-dom';
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
    const { fetchBookmarks, fetchNotes } = this.props;
    fetchNotes();
    await fetchBookmarks();
  };

  render() {
    const { bookmarks, deleteBookmark, notes, isLoading } = this.props;
    if (!isLoading && bookmarks.length === 0) {
      return (
        <>
          <h1>Nothing Saved Yet</h1>
          <p>
            Press the <span className="" /> button to save articles for future
            reading.
          </p>
          <ul>
            <li>
              <span className={styles.Bookmark} />
              Indicates Saved Articles
            </li>
            <li>
              <span className={styles.unBookmark} />
              Indicates Unsaved Articles
            </li>
          </ul>
        </>
      );
    }
    return (
      <Col md="8">
        <Row className="d-flex justify-content-center">
          {bookmarks.map(bookmark => {
            const note = notes.find(n => n.bookmarkId === bookmark.id);
            return (
              <Card key={bookmark.id} className="col-md-5 p-0 m-4">
                <CardBody className={styles.Card}>
                  <Row>
                    <Col md="10">
                      <CardTitle>{bookmark.headline}</CardTitle>
                    </Col>
                    <Link
                      to={`/bookmark/delete/${bookmark.id}`}
                      className={styles.Bookmark}
                      aria-labelledby="bookmark"
                    >
                      X
                    </Link>
                  </Row>
                  <CardText className={styles.cardText}>
                    {bookmark.summary}
                  </CardText>
                  <img
                    src="/svg_css/scale-0.svg"
                    alt="Scale Placeholder"
                    className={styles.AnImage}
                  />
                  {note ? (
                    <NavItem
                      className={('mr-5', styles.loginItem)}
                      tag={RRNavLink}
                      to={`/bookmark/${bookmark.id}/note/${note.id}`}
                      exact
                    >
                      <img src="/svg_css/pencil.svg" alt="Notes Icon" />
                    </NavItem>
                  ) : (
                    <NavItem
                      className={('mr-5', styles.loginItem)}
                      tag={RRNavLink}
                      to={`/bookmark/${bookmark.id}/note/new`}
                      exact
                    >
                      <img src="/svg_css/pencilEmpty.svg" alt="Notes Icon" />
                    </NavItem>
                  )}
                </CardBody>
                <CardFooter>
                  Published on {bookmark.articleId} by &apos;
                  {bookmark.source}
                  &apos;
                </CardFooter>
              </Card>
            );
          })}
        </Row>
        <Switch>
          {/* switch ensures only one modal will render...  */}
          {/* // ? new modal */}
          <Route
            path="/bookmark/:bookmarkId/note/new"
            exact
            component={NotesModal}
          />
          {/* // ? existing modal */}
          <Route
            path="/bookmark/:bookmarkId/note/:id"
            exact
            component={NotesModal}
          />
        </Switch>
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
  bookmarks: [],
  notes: [],
  isLoading: false,
};

Bookmark.propTypes = {
  bookmarks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      articleId: PropTypes.string,
      ticker: PropTypes.string,
      userId: PropTypes.string,
      headline: PropTypes.string,
      source: PropTypes.string,
      url: PropTypes.string,
      summary: PropTypes.string,
      related: PropTypes.string,
      image: PropTypes.string,
      lang: PropTypes.string,
    })
  ),
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    })
  ),
  fetchBookmarks: PropTypes.func.isRequired,
  deleteBookmark: PropTypes.func.isRequired,
  fetchArticle: PropTypes.func.isRequired,
  fetchNotes: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};
