import { React, Component } from 'react';
import PropTypes from 'prop-types';

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

import styles from './styles.module.css';

class Settings extends Component {
  constructor(props) {
    super(props);
    props.fetchBlocks();
  }

  render() {
    const { blocks, user } = this.props;
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
            <Form className="p-0 mb-3">
              <Row className="p-3 ">
                <Col md="8" className="">
                  <Input
                    type="text"
                    name="block"
                    id="block"
                    placeholder="Block News Agency"
                    className={styles.InputItem}
                  />
                </Col>
                <Col md="3" className="p-0">
                  <Button color="success">Submit</Button>
                </Col>
              </Row>
            </Form>
            <ListGroup>
              {blocks.map(block => (
                <ListGroupItem>
                  <p>{block.name}</p>
                  <button type="button">
                    <img
                      src="/svg_css/Delete.svg"
                      alt="X"
                      height="24"
                      width="24"
                    />
                  </button>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
        </div>
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
  deleteBlock: PropTypes.func.isRequired
};

Settings.defaultProps = {
  blocks: [],
  user: {}
};
