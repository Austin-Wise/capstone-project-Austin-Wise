import React, { Component } from 'react';

import styles from './styles.module.css';

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

export class LoginModal extends Component {
  toggle = () => {
    this.props.history.push('/');
  };
  render() {
    return (
      <Modal isOpen={true} className={(this.props.className, styles.modal)}>
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
          </Button>{' '}
          <Button
            color="primary"
            type="submit"
            form="Login"
            value="Submit"
            onClick={this.toggle}
          >
            Confirm
          </Button>{' '}
        </ModalFooter>
      </Modal>
    );
  }
}

export class RegisterModal extends Component {
  toggle = () => {
    this.props.history.push('/');
  };
  render() {
    return (
      <Modal
        isOpen={true}
        className={(this.props.className, styles.modal)}
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
          </Button>{' '}
          <Button
            color="primary"
            type="submit"
            form="Register"
            value="Submit"
            onClick={this.toggle}
          >
            Confirm
          </Button>{' '}
        </ModalFooter>
      </Modal>
    );
  }
}
