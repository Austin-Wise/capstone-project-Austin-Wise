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
  Col,
} from 'reactstrap';
import styles from '../styles.module.css';
import container from './container';

class RegisterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      rePassword: '',
    };
  }

  toggle = () => {
    const { history } = this.props;
    history.push('/');
  };

  handleInputChange = event => {
    // get the input from the event
    const { target } = event;
    // find the value of the input
    const value = target.type === 'checkbox' ? target.checked : target.value;
    // get the name of the input from it's attribute
    const { name } = target;
    // set state to the name and the value. For example, { description: 'hi'}
    this.setState({
      [name]: value,
    });
  };

  save = event => {
    event.preventDefault();
    const { firstName, lastName, email, password, rePassword } = this.state;
    const { signUp } = this.props;
    signUp({ firstName, lastName, email, password, rePassword });
    this.toggle();
  };

  render() {
    const { firstName, lastName, email, password, rePassword } = this.state;

    return (
      <Modal isOpen className={styles.modal} contentClassName={styles.modal}>
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
                    value={firstName}
                    onChange={this.handleInputChange}
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
                    value={lastName}
                    onChange={this.handleInputChange}
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
                value={email}
                onChange={this.handleInputChange}
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
                value={password}
                onChange={this.handleInputChange}
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
                value={rePassword}
                onChange={this.handleInputChange}
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
            onClick={this.save}
          >
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default container(RegisterModal);

RegisterModal.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  signUp: PropTypes.func.isRequired,
};
