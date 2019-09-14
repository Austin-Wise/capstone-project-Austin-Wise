import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Table,
  Col,
  Jumbotron,
  Input,
  Form,
  Row,
  InputGroupAddon,
  InputGroup,
  Container,
  Button
} from 'reactstrap';
import container from './container';
import styles from './styles.module.css';

class Journal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      journal: {
        ticker: '',
        type: 'Long',
        buyDate: '',
        qtyBuy: '',
        buyPrice: '',
        sellDate: '',
        qtySold: '',
        sellPrice: '',
        fees: '',
        comment: ''
      }
    };
    props.fetchJournals();
  }

  handleInputChange = event => {
    // get the input from the event
    const { target } = event;
    // find the value of the input
    const value = target.type === 'checkbox' ? target.checked : target.value;
    // get the name of the input from it's attribute
    const { name } = target;
    // set state to the name and the value.
    const { journal } = this.state;
    this.setState({
      journal: { ...journal, [name]: value }
    });
  };

  save = event => {
    // make sure the form doesn't submit with the browser
    event.preventDefault();
    const { journal } = this.state;
    const { createJournal, updateJournal } = this.props;

    if (journal.id) {
      updateJournal(journal);
    } else {
      createJournal(journal);
    }
  };

  deleteJournalFunc = id => async () => {
    const { deleteJournal } = this.props;
    await deleteJournal(id);
  };

  render() {
    const { journals } = this.props;
    // pull the data from state
    const { journal } = this.state;
    return (
      <Col md="8" className={styles.Section}>
        <Jumbotron className={styles.Jumbo}>
          <Container fluid>
            <h1 className="display-3">
              {journal.id ? 'Edit Entry' : 'New Entry'}
            </h1>
          </Container>
          <Form
            className={styles.Form}
            onSubmit={this.save}
            onReset={() => this.setState({ journal: {} })}
          >
            <Row form>
              <Col md="8">
                <Row form>
                  <Col md="3">
                    <Input
                      type="text"
                      name="ticker"
                      id="ticker"
                      onChange={this.handleInputChange}
                      value={journal.ticker}
                      aria-label="Ticker Name"
                      placeholder="Ticker"
                      className={styles.InputItem}
                    />
                  </Col>
                </Row>
                <Row form>
                  <Col md="6">
                    <Input
                      type="number"
                      name="qtyBuy"
                      id="qtyBuy"
                      min="0"
                      step="1"
                      onChange={this.handleInputChange}
                      value={journal.qtyBuy}
                      aria-label="Buy Quantity"
                      placeholder="QTY Buy"
                      className={styles.InputItem}
                    />
                  </Col>
                  <Col md="6">
                    <Input
                      type="number"
                      name="qtySold"
                      id="qtySold"
                      min="0"
                      step="1"
                      onChange={this.handleInputChange}
                      value={journal.qtySold}
                      aria-label="Sell Quantity"
                      placeholder="Qty Sold"
                      className={styles.InputItem}
                    />
                  </Col>
                </Row>
                <Row form>
                  <Col md="6">
                    <InputGroup className={styles.InputItem}>
                      <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                      <Input
                        min="0"
                        step=".001"
                        type="number"
                        name="buyPrice"
                        id="buyPrice"
                        onChange={this.handleInputChange}
                        value={journal.buyPrice}
                        aria-label="Buy Price"
                        placeholder="Buy Price"
                      />
                    </InputGroup>
                  </Col>
                  <Col md="6">
                    <InputGroup className={styles.InputItem}>
                      <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                      <Input
                        min="0"
                        step=".001"
                        type="number"
                        name="sellPrice"
                        id="sellPrice"
                        onChange={this.handleInputChange}
                        value={journal.sellPrice}
                        aria-label="Sell Price"
                        placeholder="Sell Price"
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md="6">
                    <Input
                      min="0"
                      step=".0001"
                      type="number"
                      name="fees"
                      id="fees"
                      placeholder="Fees"
                      onChange={this.handleInputChange}
                      value={journal.fees}
                      aria-label="Fees"
                      className={styles.InputItem}
                    />
                  </Col>
                  <Col md="6">
                    <Input
                      type="select"
                      name="type"
                      id="tradeType"
                      placeholder="Long / Short"
                      onChange={this.handleInputChange}
                      value={journal.type}
                      aria-label="Trade Type"
                      className={styles.InputItem}
                    >
                      <option>Long</option>
                      <option>Short</option>
                    </Input>
                  </Col>
                </Row>
              </Col>
              <Col md="4">
                <Row form>
                  <Col md="6">
                    <Input
                      type="date"
                      name="buyDate"
                      id="buyDate"
                      placeholder="Buy Date"
                      onChange={this.handleInputChange}
                      value={journal.buyDate}
                      aria-label="Buy Date"
                      className={styles.InputItem}
                    />
                  </Col>
                  <Col md="6">
                    <Input
                      type="date"
                      name="sellDate"
                      id="sellDate"
                      placeholder="Sell Date"
                      onChange={this.handleInputChange}
                      value={journal.sellDate}
                      aria-label="Sell Date"
                      className={styles.InputItem}
                    />
                  </Col>
                </Row>
                <Row form>
                  <Col md="12">
                    <Input
                      type="textarea"
                      name="comment"
                      id="comments"
                      placeholder="Comments"
                      onChange={this.handleInputChange}
                      value={journal.comment}
                      aria-label="Comments"
                      rows="6"
                    />
                  </Col>
                  <Col className="d-flex justify-content-between mt-3">
                    <Button color="danger" type="reset">
                      Clear
                    </Button>
                    <Button color="success" type="submit">
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Jumbotron>
        <Table>
          <thead>
            <tr>
              <td>Symbol</td>
              <td>Type</td>
              <td>Buy Date</td>
              <td>QTY Buy</td>
              <td>Buy Price</td>
              <td>Sell Date</td>
              <td>QTY Sold</td>
              <td>Sell Price</td>
              <td>Fees</td>
              <td>Gain/Loss</td>
              <td />
            </tr>
          </thead>
          <tbody>
            {journals.map(entry => (
              <tr
                key={entry.id}
                onClick={() => {
                  this.setState({ journal: entry });
                }}
              >
                <td>{entry.ticker}</td>
                <td>{entry.type}</td>
                <td>{entry.buyDate}</td>
                <td>{entry.qtyBuy}</td>
                <td>{entry.buyPrice}</td>
                <td>{entry.sellDate}</td>
                <td>{entry.qtySold}</td>
                <td>{entry.sellPrice}</td>
                <td>{entry.fees}</td>
                <td>
                  {(entry.type === 'Long'
                    ? entry.sellPrice * entry.qtySold -
                      entry.buyPrice * entry.qtyBuy -
                      entry.fees
                    : entry.buyPrice * entry.qtyBuy -
                      entry.sellPrice * entry.qtySold -
                      entry.fees
                  ).toFixed(2)}
                </td>
                <td>
                  <button
                    className={styles.DeleteButton}
                    onClick={this.deleteJournalFunc(entry.id)}
                    type="button"
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    );
  }
}

export default container(Journal);

Journal.propTypes = {
  journals: PropTypes.arrayOf(
    PropTypes.shape({
      ticker: PropTypes.string,
      type: PropTypes.oneOf(['Long', 'Short']),
      buyDate: PropTypes.instanceOf(Date),
      qtyBuy: PropTypes.number,
      buyPrice: PropTypes.number,
      sellDate: PropTypes.instanceOf(Date),
      qtySold: PropTypes.number,
      sellPrice: PropTypes.number,
      fees: PropTypes.number,
      comments: PropTypes.string
    })
  ),
  createJournal: PropTypes.func.isRequired,
  fetchJournals: PropTypes.func.isRequired,
  deleteJournal: PropTypes.func.isRequired,
  updateJournal: PropTypes.func.isRequired
};

Journal.defaultProps = {
  journals: []
};
