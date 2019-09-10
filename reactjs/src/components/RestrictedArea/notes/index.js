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
  Input
} from 'reactstrap';
import container from './container';

import styles from './styles.module.css';

class NotesModal extends Component {
  constructor(props) {
    super(props);
    props.fetchItems();
  }

  toggle = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <Modal isOpen className={styles.modal}>
        <ModalHeader toggle={this.toggle} className={styles.h1}>
          New Note
        </ModalHeader>
        <ModalBody>
          <Form id="Note">
            <Input
              type="textarea"
              name="newNote"
              id="newNote"
              aria-label="New Article Notes"
              placeholder="Notes on Article"
              rows="6"
            />
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.toggle} className="mr-5">
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            form="Note"
            value="Submit"
            className="mb-3"
            onClick={this.toggle}
          >
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default container(NotesModal);

NotesModal.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  fetchItems: PropTypes.func.isRequired
};
