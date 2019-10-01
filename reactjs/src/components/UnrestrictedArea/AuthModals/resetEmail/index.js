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
} from 'reactstrap';
import styles from '../styles.module.css';
import container from './container';

class ResetEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
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
    const { email } = this.state;
    const { forgotPassword } = this.props;
    forgotPassword({ email });
    this.toggle();
  };

  render() {
    const { email } = this.state;

    return (
      <Modal isOpen className={styles.modal} contentClassName={styles.modal}>
        <ModalHeader toggle={this.toggle} className={styles.h1}>
          Reset Password
        </ModalHeader>
        <ModalBody>
          <Form id="ResetEmail">
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
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.toggle}>
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            form="ResetEmail"
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

export default container(ResetEmail);

ResetEmail.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  forgotPassword: PropTypes.func.isRequired,
};
