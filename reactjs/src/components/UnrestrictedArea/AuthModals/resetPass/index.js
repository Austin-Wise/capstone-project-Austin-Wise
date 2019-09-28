import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import queryString from 'query-string';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
} from 'reactstrap';
import styles from '../styles.module.css';
import container from './container';

class ResetPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const { password, rePassword } = this.state;
    const {
      resetPassword,
      location: { search },
    } = this.props;
    const query = queryString.parse(search);
    const { token } = query;

    resetPassword({ token, password, rePassword });
    this.toggle();
  };

  render() {
    const { password, rePassword } = this.state;

    return (
      <Modal isOpen className={styles.modal} contentClassName={styles.modal}>
        <ModalHeader toggle={this.toggle} className={styles.h1}>
          Reset Password
        </ModalHeader>
        <ModalBody>
          <Form id="ResetPassword">
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
            form="ResetPassword"
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

export default container(ResetPass);

ResetPass.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.history.isRequired,
  resetPassword: PropTypes.func.isRequired,
};
