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
import { Route, NavLink as RRNavLink } from 'react-router-dom';
import NotesModal from '../notes';
import styles from './styles.module.css';

class Bookmark extends Component {
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

  render() {
    const { bookmark, className } = this.props;
    const { modal, isOpen } = this.state;
    return (
      <Col md="8">
        <Row className="d-flex justify-content-center">
          {bookmark.map(article =>
            article.bookmark ? (
              <Card className="col-md-5 p-0 m-4">
                <CardBody className={styles.Card}>
                  <Row>
                    <Col md="10">
                      <CardTitle>{article.title}</CardTitle>
                    </Col>
                    <Col md="2">
                      <button
                        className={styles.Bookmark}
                        type="button"
                        aria-labelledby="bookmark"
                        onClick={this.toggleBookmark}
                      />
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
                  Published on {article.published} by &apos;{article.source}
                  &apos;
                </CardFooter>
              </Card>
            ) : (
              ''
            )
          )}
        </Row>{' '}
        <div>
          <Modal
            isOpen={modal}
            toggleBookmark={this.toggleBookmark}
            className={(className, styles.Modal)}
          >
            <ModalHeader
              className={styles.ModalHeader}
              toggleBookmark={this.toggleBookmark}
            >
              Are you sure?
            </ModalHeader>
            <ModalFooter>
              <Button color="danger" onClick={this.toggleBookmark}>
                No,Cancel
              </Button>
              <Button color="primary" onClick={this.toggleBookmark}>
                Yes, Delete
              </Button>{' '}
            </ModalFooter>
          </Modal>
        </div>
        <Route path="/:bookmarkId/note/:noteId" component={NotesModal} />
      </Col>
    );
  }
}

export default Bookmark;

Bookmark.defaultProps = {
  bookmark: [
    {
      id: '506f4a26-dd6a-4432-8fde-c54eafd61720',
      newsId: 'b9f9e99a-8b91-4dde-93b8-a2dcc1d3a215',
      ticker: 'AAPL',
      userId: '1e1f588b-38c1-4170-bc8e-68a4364e3ed8'
    }
  ]
};

Bookmark.propTypes = {
  bookmark: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      newsId: PropTypes.string,
      ticker: PropTypes.string,
      userId: PropTypes.string
    })
  ),
  className: PropTypes.string.isRequired
};
