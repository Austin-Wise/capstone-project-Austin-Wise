import React, { Component } from 'react';

import { Form, Row, FormGroup, Col, Input, Container } from 'reactstrap';

class Contact extends Component {
  render() {
    return (
      <>
        <Container>
          <Form>
            <Row form>
              <FormGroup>
                <Col md={6}>
                  <Input type="text" name="name" id="name" placeholder="Name" />
                </Col>
                <Col md={6}>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                  />
                </Col>
              </FormGroup>
            </Row>
            <FormGroup>
              <Input type="textarea" name="text" id="exampleText" />
            </FormGroup>
          </Form>
        </Container>
      </>
    );
  }
}

export default Contact;
