import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Route, Link } from 'react-router-dom';
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
import ResetEmail from '../resetEmail';
import container from './container';
import styles from '../styles.module.css';

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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
    const { email, password } = this.state;
    const { login } = this.props;
    login({ email, password });
    this.toggle();
  };

  render() {
    const { email, password } = this.state;
    return (
      <Modal isOpen className={styles.modal}>
        <ModalHeader toggle={this.toggle} className={styles.h1}>
          Login
        </ModalHeader>
        <ModalBody>
          <Form id="Login" onSubmit={this.save}>
            <FormGroup>
              <Input
                type="email"
                name="email"
                id="Email"
                value={email}
                onChange={this.handleInputChange}
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
                value={password}
                onChange={this.handleInputChange}
                placeholder="Password"
                aria-label="Password"
                className={styles.input}
              />
            </FormGroup>

            <Link to="/login/reset">Forgot Password</Link>
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
            onClick={this.save}
          >
            Confirm
          </Button>
        </ModalFooter>
        <Route path="/login/reset" exact component={ResetEmail} />
      </Modal>
    );
  }
}

export default container(LoginModal);

LoginModal.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  login: PropTypes.func.isRequired,
};
