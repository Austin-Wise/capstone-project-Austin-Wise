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
    this.state = {
      heading: '',
      body: ''
    };
    this.loadData();
  }

  toggle = () => {
    const { history } = this.props;
    history.push('/bookmark');
  };

  deleteNote = async () => {
    const {
      deleteNote,
      history,
      match: {
        params: { id }
      }
    } = this.props;
    await deleteNote(id);
    history.goBack();
  };

  handleInputChange = event => {
    // get the input from the event
    const { target } = event;
    // find the value of the input
    const value = target.type === 'checkbox' ? target.checked : target.value;
    // get the name of the input from it's attribute
    const { name } = target;
    // set state to the name and the value.
    this.setState({
      [name]: value
    });
  };

  save = async event => {
    // make sure the form doesn't submit with the browser
    event.preventDefault();
    const {
      createNote,
      updateNote,
      match: {
        params: { bookmarkId, id }
      }
    } = this.props;
    const { heading, body } = this.state;
    if (id) {
      await updateNote({ id, heading, body });
    } else {
      await createNote({ bookmarkId, heading, body });
    }

    this.toggle();
  };

  loadData = async () => {
    const {
      match: {
        params: { id }
      },
      fetchNote
    } = this.props;
    if (!id) return;
    await fetchNote(id);
    // update state with data from updated item
    const { note } = this.props;
    this.setState({ ...note });
  };

  render() {
    const { heading, body } = this.state;
    const { match } = this.props;
    return (
      <Modal isOpen className={styles.modal}>
        <ModalHeader toggle={this.toggle} className={styles.h1}>
          {match.params.id ? 'Edit Note' : 'New Note'}
        </ModalHeader>
        <ModalBody>
          <Form id="Note" onSubmit={this.save}>
            <Input
              type="text"
              name="heading"
              id="heading"
              onChange={this.handleInputChange}
              value={heading}
              placeholder="Note Heading"
              aria-label="New News Feed"
              className={styles.input}
            />
            <Input
              type="textarea"
              name="body"
              id="body"
              onChange={this.handleInputChange}
              value={body}
              aria-label="Note Body"
              placeholder="Notes on article..."
              rows="6"
            />
          </Form>
        </ModalBody>
        <ModalFooter>
          {match.params.id && (
            <Button color="danger" onClick={this.deleteNote}>
              Delete Note
            </Button>
          )}
          <Button color="danger" onClick={this.toggle} className="mr-5">
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            form="Note"
            value="Submit"
            className="mb-3"
            // onClick={this.toggle}
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
  note: PropTypes.shape({
    header: PropTypes.string,
    body: PropTypes.string
  }),
  history: ReactRouterPropTypes.history.isRequired,
  fetchNote: PropTypes.func.isRequired,
  createNote: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  match: ReactRouterPropTypes.match.isRequired
};

NotesModal.defaultProps = {
  note: Object
};
