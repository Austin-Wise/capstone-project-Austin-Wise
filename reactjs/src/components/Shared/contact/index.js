import React, { Component } from 'react';

import {
  Form,
  Row,
  FormGroup,
  Input,
  Container,
  Button,
  NavLink
} from 'reactstrap';

import { NavLink as RRNavLink } from 'react-router-dom';

import styles from './styles.module.css';

class Contact extends Component {
  render() {
    return (
      <>
        <div className={styles.contact}>
          <Container className="row justify-content-center">
            <Form className="col-lg-8">
              <h2>Contact Us</h2>
              <FormGroup className="col col-12">
                <Row>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      name="contactName"
                      placeholder="Name"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="email"
                      className="form-control"
                      name="contactEmail"
                      placeholder="Email"
                    />
                  </div>
                </Row>
              </FormGroup>
              <FormGroup className="col col-12">
                <input
                  type="text"
                  name="contactSubject"
                  className="form-control"
                  placeholder="Subject"
                />
              </FormGroup>
              <FormGroup className="col col-12">
                <Input
                  type="textarea"
                  name="contactMessage"
                  placeholder="Message"
                />
              </FormGroup>
              <FormGroup className="col col-12 row d-flex justify-content-center">
                <NavLink tag={RRNavLink} to="/" className="col col-md-3">
                  <Button color="danger" className="col-12 h-100 text-nowrap">
                    Back to Home
                  </Button>
                </NavLink>
                <Button
                  color="primary"
                  type="submit"
                  form="Login"
                  value="Submit"
                  onClick={this.toggle}
                  className="col col-md-3"
                >
                  Send
                </Button>
              </FormGroup>
            </Form>
          </Container>
        </div>
      </>
    );
  }
}

export default Contact;
