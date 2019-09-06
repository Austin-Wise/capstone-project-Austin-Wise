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
  Button
} from 'reactstrap';

import styles from './styles.module.css';

class Bookmark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      notesModal: false
    };

    this.toggleBookmark = this.toggleBookmark.bind(this);
    this.toggleNotes = this.toggleNotes.bind(this);
  }

  toggleBookmark() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  toggleNotes() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    const { news, className } = this.props;
    const { modal, notesModal } = this.state;
    return (
      <Col md="8">
        <Row className="d-flex justify-content-center">
          {news.map(article =>
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
                  <button
                    className={styles.Notes}
                    type="button"
                    aria-labelledby="add note"
                    onClick={this.toggleNotes}
                  />
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
        <div>
          <Modal
            isOpen={notesModal}
            toggleNotes={this.toggleNotes}
            className={(className, styles.Modal)}
          >
            <ModalHeader
              className={styles.ModalHeader}
              toggleNotes={this.toggleNotes}
            >
              Are you sure?
            </ModalHeader>

            <ModalFooter>
              <Button color="danger" onClick={this.toggleNotes}>
                So
              </Button>
              <Button color="primary" onClick={this.toggleNotes}>
                Yes, Delete
              </Button>{' '}
            </ModalFooter>
          </Modal>
        </div>
      </Col>
    );
  }
}

export default Bookmark;

Bookmark.defaultProps = {
  news: [
    {
      title:
        'Google’s report on massive iPhone security flaw doubles as dig against Apple’s privacy stance',
      text:
        'The research is interesting and comprehensive, but the impact of the flaws on most iPhone users may not be huge. Also, Google is using the compiled research to publicly needle Apple, following Apple’s campaign to differentiate its products on privacy and security.',
      source: 'CNBC',
      published: '22/05/2001',
      rating: -0.2,
      id: '291m2fq3',
      bookmark: false
    },
    {
      title:
        'Google’s report on massive iPhone security flaw doubles as dig against Apple’s privacy stance',
      text:
        'The research is interesting and comprehensive, but the impact of the flaws on most iPhone users may not be huge. Also, Google is using the compiled research to publicly needle Apple, following Apple’s campaign to differentiate its products on privacy and security.',
      source: 'CNBC',
      published: '22/05/2001',
      rating: -0.2,
      id: '291m2fq3',
      bookmark: false
    },
    {
      title:
        'Google’s report on massive iPhone security flaw doubles as dig against Apple’s privacy stance',
      text:
        'The research is interesting and comprehensive, but the impact of the flaws on most iPhone users may not be huge. Also, Google is using the compiled research to publicly needle Apple, following Apple’s campaign to differentiate its products on privacy and security.',
      source: 'CNBC',
      published: '22/05/2001',
      rating: -0.2,
      id: '291m2fq3',
      bookmark: true
    },
    {
      title:
        'Google’s report on massive iPhone security flaw doubles as dig against Apple’s privacy stance',
      text:
        'The research is interesting and comprehensive, but the impact of the flaws on most iPhone users may not be huge. Also, Google is using the compiled research to publicly needle Apple, following Apple’s campaign to differentiate its products on privacy and security.',
      source: 'CNBC',
      published: '22/05/2001',
      rating: -0.2,
      id: '291m2fq3',
      bookmark: true
    }
  ]
};

Bookmark.propTypes = {
  news: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      text: PropTypes.string,
      source: PropTypes.string,
      published: PropTypes.instanceOf(Date),
      rating: PropTypes.number,
      id: PropTypes.string,
      bookmark: PropTypes.bool
    })
  ),
  className: PropTypes.string.isRequired
};
