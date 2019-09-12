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
    this.setState({
      [name]: value
    });
  };

  save = event => {
    // make sure the form doesn't submit with the browser
    event.preventDefault();
    const { createJournal } = this.props;
    const {
      ticker,
      type,
      buyDate,
      qtyBuy,
      buyPrice,
      sellDate,
      qtySold,
      sellPrice,
      fees,
      comment
    } = this.state;
    createJournal({
      ticker,
      type,
      buyDate,
      qtyBuy,
      buyPrice,
      sellDate,
      qtySold,
      sellPrice,
      fees,
      comment
    });
  };

  render() {
    const { journals } = this.props;
    // pull the data from state
    const {
      ticker,
      type,
      buyDate,
      qtyBuy,
      buyPrice,
      sellDate,
      qtySold,
      sellPrice,
      fees,
      comment
    } = this.state;
    return (
      <Col md="8" className={styles.Section}>
        <Jumbotron className={styles.Jumbo}>
          <Container fluid>
            <h1 className="display-3">New Entry</h1>
          </Container>
          <Form className={styles.Form} onSubmit={this.save}>
            <Row form>
              <Col md="8">
                <Row form>
                  <Col md="3">
                    <Input
                      type="text"
                      name="ticker"
                      id="ticker"
                      onChange={this.handleInputChange}
                      value={ticker}
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
                      value={qtyBuy}
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
                      value={qtySold}
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
                        value={buyPrice}
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
                        value={sellPrice}
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
                      value={fees}
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
                      value={type}
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
                      value={buyDate}
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
                      value={sellDate}
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
                      value={comment}
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
            </tr>
          </thead>
          <tbody>
            {journals.map(journal => (
              <tr
                key={journal.id}
                onClick={() => {
                  this.setState(journal);
                }}
              >
                <td>{journal.ticker}</td>
                <td>{journal.type}</td>
                <td>{journal.buyDate}</td>
                <td>{journal.qtyBuy}</td>
                <td>{journal.buyPrice}</td>
                <td>{journal.sellDate}</td>
                <td>{journal.qtySold}</td>
                <td>{journal.sellPrice}</td>
                <td>{journal.fees}</td>
                <td>
                  {(journal.type === 'Long'
                    ? journal.sellPrice * journal.qtySold -
                      journal.buyPrice * journal.qtyBuy -
                      journal.fees
                    : journal.buyPrice * journal.qtyBuy -
                      journal.sellPrice * journal.qtySold -
                      journal.fees
                  ).toFixed(2)}
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
  deleteJournal: PropTypes.func.isRequired
};

Journal.defaultProps = {
  journals: []
};
