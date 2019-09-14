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
  FormGroup,
  Input,
  Row,
  Col
} from 'reactstrap';
import styles from './styles.module.css';

export default class RegisterModal extends Component {
  toggle = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { className } = this.props;
    return (
      <Modal
        isOpen
        className={(className, styles.modal)}
        contentClassName={styles.modal}
      >
        <ModalHeader toggle={this.toggle} className={styles.h1}>
          Register
        </ModalHeader>
        <ModalBody>
          <Form id="Register">
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="First Name"
                    aria-label="First Name"
                    className={styles.input}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Last Name"
                    aria-label="Last Name"
                    className={styles.input}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                aria-label="Email"
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                aria-label="Password"
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                name="rePassword"
                id="rePassword"
                placeholder="Re-Enter Password"
                aria-label="Re-Enter Password"
                className={styles.input}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.toggle}>
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            form="Register"
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

RegisterModal.propTypes = {
  className: PropTypes.string.isRequired,
  history: ReactRouterPropTypes.history.isRequired
};
