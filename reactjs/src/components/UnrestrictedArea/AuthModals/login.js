import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input
} from 'reactstrap';
import styles from './styles.module.css';

export default class LoginModal extends Component {
  toggle = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <Modal isOpen className={styles.modal}>
        <ModalHeader toggle={this.toggle} className={styles.h1}>
          Login
        </ModalHeader>
        <ModalBody>
          <Form id="Login">
            <FormGroup>
              <Input
                type="email"
                name="email"
                id="Email"
                placeholder="Email"
                aria-label="Email"
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                name="password"
                id="Password"
                placeholder="Password"
                aria-label="Password"
                className={styles.input}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.toggle} className="mr-5">
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            form="Login"
            value="Submit"
            onClick={this.toggle}
          >
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

LoginModal.propTypes = {
  history: ReactRouterPropTypes.history.isRequired
};
