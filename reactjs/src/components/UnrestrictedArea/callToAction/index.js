import React, { Component } from 'react';

import { Container, Button, Row, Col } from 'reactstrap';

import MediaBlock from '../mediaBlock';
import FeatureCarousel from '../featureCarousel';

import styles from './styles.module.css';

class CallToAction extends Component {
  render() {
    return (
      <>
        <MediaBlock />
        <div className={styles.c2aBack}>
          <Container>
            <Row className="justify-content-md-center">
              <Col className="col-lg-8 pr-0">
                <div className={styles.c2a}>
                  <h2>
                    Your investments
                    <br />
                    shouldn&apos;t be working
                    <br />
                    against you.
                  </h2>
                  <p>
                    TKRtape is a research tool for expedited market analysis.
                    Designed for the part-time investor, while useful for the
                    money manager, we pride ourselves in bringing investment
                    holdings, breaking news and their respective sentimental
                    analysis all to a single, easy to use interface.
                  </p>
                  <Button color="secondary" onClick={this.toggle}>
                    Create an Account
                  </Button>
                </div>
              </Col>
              <Col className="col col-xl-4 col-l-6 pl-0">
                <FeatureCarousel className="carousel" />
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default CallToAction;
