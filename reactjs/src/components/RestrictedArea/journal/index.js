import React from 'react';

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

import styles from './styles.module.css';

const Journal = props => {
  const { items } = props;
  return (
    <Col md="8" className={styles.Section}>
      <Jumbotron className={styles.Jumbo}>
        <Container fluid>
          <h1 className="display-3">New Entry</h1>
        </Container>
        <Form className={styles.Form}>
          <Row form>
            <Col md="8">
              <Row form>
                <Col md="3">
                  <Input
                    type="text"
                    name="symbol"
                    id="symbol"
                    placeholder="Symbol"
                    className={styles.InputItem}
                  />
                </Col>
              </Row>
              <Row form>
                <Col md="6">
                  <Input
                    type="number"
                    name="qtyBought"
                    id="qtyBuy"
                    placeholder="QTY Buy"
                    className={styles.InputItem}
                  />
                </Col>
                <Col md="6">
                  <Input
                    type="number"
                    name="qtySold"
                    id="qtyBuy"
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
                      placeholder="Buy Price"
                      min={0}
                      type="number"
                      name="buyPrice"
                      id="buyPrice"
                      step=".001"
                    />
                  </InputGroup>
                </Col>
                <Col md="6">
                  <InputGroup className={styles.InputItem}>
                    <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                    <Input
                      placeholder="Sell Price"
                      min={0}
                      type="number"
                      name="sellPrice"
                      id="sellPrice"
                      step=".001"
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row form>
                <Col md="6">
                  <Input
                    type="number"
                    name="fees"
                    id="fees"
                    placeholder="Fees"
                    className={styles.InputItem}
                  />
                </Col>
                <Col md="6">
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    placeholder="Long / Short"
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
                    type="datetime"
                    name="buyDate"
                    id="buyDate"
                    placeholder="Buy Date"
                    className={styles.InputItem}
                  />
                </Col>
                <Col md="6">
                  <Input
                    type="datetime"
                    name="sellDate"
                    id="sellDate"
                    placeholder="Sell Date"
                    className={styles.InputItem}
                  />
                </Col>
              </Row>
              <Row form>
                <Col md="12">
                  <Input
                    type="textarea"
                    name="text"
                    id="exampleText"
                    placeholder="Comments"
                    rows="6"
                  />
                </Col>
                <Col className="d-flex justify-content-between mt-3">
                  <Button color="danger">Clear</Button>
                  <Button color="success">Submit</Button>
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
          {items.map(item => (
            <tr>
              <td>{item.ticker}</td>
              <td>{item.type}</td>
              <td>{item.buyDate}</td>
              <td>{item.qtyBuy}</td>
              <td>{item.buyPrice}</td>
              <td>{item.sellDate}</td>
              <td>{item.qtySold}</td>
              <td>{item.sellPrice}</td>
              <td>{item.fees}</td>
              <td>
                {(item.type === 'Long'
                  ? item.sellPrice * item.qtySold -
                    item.buyPrice * item.qtyBuy -
                    item.fees
                  : item.buyPrice * item.qtyBuy -
                    item.sellPrice * item.qtySold -
                    item.fees
                ).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Col>
  );
};

export default Journal;

Journal.propTypes = {
  items: PropTypes.arrayOf(
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
      comment: PropTypes.string
    })
  )
};

Journal.defaultProps = {
  items: [
    {
      ticker: 'AAPL',
      type: 'Long',
      buyDate: '22/05/2001',
      qtyBuy: 20,
      buyPrice: 210.2,
      sellDate: '22/05/2001',
      qtySold: 20,
      sellPrice: 214.11,
      fees: 3,
      comment: 'Sell before Q1 news'
    },
    {
      ticker: 'GOOGL',
      type: 'Short',
      buyDate: '22/05/2003',
      qtyBuy: 20,
      buyPrice: 240.2,
      sellDate: '22/05/2006',
      qtySold: 20,
      sellPrice: 104.11,
      fees: 3,
      comment: 'Do Something!'
    }
  ]
};
