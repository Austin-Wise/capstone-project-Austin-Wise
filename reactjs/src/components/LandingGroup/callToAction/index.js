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
          <Container className={styles.c2a}>
            <section className={styles.c2aBody}>
              <h2>
                Your investments
                <br />
                shouldn't be working
                <br />
                against you.
              </h2>
              <p>
                TKRtape is a research tool for expedited market analysis.
                Designed for the part-time investor, while useful for the money
                manager, we pride ourselves in bringing investment holdings,
                breaking news and their respective sentimental analysis all to a
                single, easy to use interface.
              </p>
              <Button color="secondary" onClick={this.toggle}>
                Create an Account
              </Button>
            </section>
            <FeatureCarousel className={'carousel'} />
          </Container>
        </div>
      </>
    );
  }
}

export default CallToAction;
