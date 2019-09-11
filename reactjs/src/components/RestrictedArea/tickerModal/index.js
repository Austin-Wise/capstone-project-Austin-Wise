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
import container from './container';
import styles from './styles.module.css';

class TickerModal extends Component {
  constructor(props) {
    super(props);
    props.fetchTicker();
    this.state = {
      symbol: ''
    };
  }

  handleInputChange = event => {
    // get the input from the event
    const { target } = event;
    // find the value of the input
    const value = target.type === 'checkbox' ? target.checked : target.value;
    // get the name of the input from it's attribute
    const { name } = target;
    // set state to the name and the value. For example, { description: 'hi'}
    this.setState({
      [name]: value
    });
  };

  toggle = () => {
    const { history } = this.props;
    history.push('/');
  };

  save = async event => {
    // make sure the form doesn't submit with the browser
    event.preventDefault();
    const { createTicker } = this.props;
    const { symbol } = this.state;
    await createTicker({ symbol: symbol.toUpperCase() });
    this.toggle();
  };

  render() {
    const { symbol } = this.state;
    return (
      <Modal isOpen className={styles.modal}>
        <ModalHeader toggle={this.toggle} className={styles.h1}>
          New Feed
        </ModalHeader>
        <ModalBody>
          <Form id="Feed" onSubmit={this.save}>
            <Input
              type="text"
              name="symbol"
              id="symbol"
              onChange={this.handleInputChange}
              value={symbol}
              placeholder="i.e. 'GOOGL'"
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
          >
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default container(TickerModal);

TickerModal.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  fetchTicker: PropTypes.func.isRequired,
  createTicker: PropTypes.func.isRequired
};
