import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Modal, ModalHeader, ModalFooter, Button } from 'reactstrap';
import styles from './styles.module.css';

export default class DeleteModal extends Component {
  toggle = () => {
    const { history } = this.props;
    history.goBack();
  };

  delete = async () => {
    const {
      deleteFunc,
      history,
      match: {
        params: { id }
      }
    } = this.props;
    await deleteFunc(id);
    history.goBack();
  };

  render() {
    return (
      <Modal isOpen toggle={this.toggle} className={styles.Modal}>
        <ModalHeader className={styles.ModalHeader} toggle={this.toggle}>
          Are you sure?
        </ModalHeader>
        <ModalFooter>
          <Button color="danger" onClick={this.toggle}>
            No,Cancel
          </Button>
          <Button color="primary" onClick={this.delete}>
            Yes, Delete
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

DeleteModal.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  deleteFunc: PropTypes.func.isRequired
};
