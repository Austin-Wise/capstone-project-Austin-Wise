import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Input
} from 'reactstrap';
import styles from './styles.module.css';

export default class TickerModal extends Component {
  toggle = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { className } = this.props;
    return (
      <Modal isOpen className={(className, styles.modal)}>
        <ModalHeader toggle={this.toggle} className={styles.h1}>
          New Feed
        </ModalHeader>
        <ModalBody>
          <Form id="Feed">
            <Input
              type="text"
              name="newFeed"
              id="newFeed"
              placeholder="GOOGL"
              aria-label="New News Feed"
              className={styles.input}
            />
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.toggle} className="mr-5">
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            form="Feed"
            value="Submit"
            className="mb-3"
            onClick={this.toggle}
          >
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

TickerModal.propTypes = {
  className: PropTypes.string.isRequired,
  history: ReactRouterPropTypes.history.isRequired
};
