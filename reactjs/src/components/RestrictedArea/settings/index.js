/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import { Route, Link, NavLink as RRNavLink } from 'react-router-dom';

import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Form,
  Input,
  Button
} from 'reactstrap';
import container from './container';
import DeleteModal from '../../Shared/deleteModal';
import styles from './styles.module.css';

class Settings extends Component {
  constructor(props) {
    super(props);
    props.fetchBlocks();
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

  save = event => {
    // make sure the form doesn't submit with the browser
    event.preventDefault();
    const { createBlock } = this.props;
    const { name } = this.state;
    createBlock({
      name
    });
  };

  render() {
    const { blocks, user, deleteBlock, match } = this.props;
    return (
      <Col md="8" className={styles.Settings}>
        <div>
          <h3>Name</h3>
          <span className="mb-4 ml-4">{user.name}</span>
          <h3 className="mt-4">Email</h3>
          <span className="mb-4 ml-4">{user.email}</span>
        </div>
        <div>
          <button type="button" className="btn btn-info ml-4">
            Change Password
          </button>
        </div>
        <div>
          <Col md="5" className="pl-0">
            <h3>Block List</h3>
            <Form className="p-0 mb-3" onSubmit={this.save}>
              <Row className="p-3 ">
                <Col md="8" className="">
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={blocks.name}
                    onChange={this.handleInputChange}
                    placeholder="Block News Agency"
                    className={styles.InputItem}
                  />
                </Col>
                <Col md="3" className="p-0">
                  <Button color="success" type="submit" value="Submit">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
            <ListGroup>
              {blocks.map(block => (
                <ListGroupItem>
                  <p>{block.name}</p>
                  <Link
                    to={`/settings/delete_block/${block.id}`}
                    className={styles.Bookmark}
                    aria-labelledby="bookmark"
                  >
                    X
                  </Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
        </div>
        <Route
          path="/settings/delete_block/:id"
          exact
          render={routeProps => (
            <DeleteModal deleteFunc={deleteBlock} {...routeProps} />
          )}
        />
      </Col>
    );
  }
}

export default container(Settings);

Settings.propTypes = {
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    })
  ),
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string
  }),
  fetchBlocks: PropTypes.func.isRequired,
  deleteBlock: PropTypes.func.isRequired,
  createBlock: PropTypes.func.isRequired,
  match: ReactRouterPropTypes.match.isRequired
};

Settings.defaultProps = {
  blocks: [],
  user: {}
};
