import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import CallToAction from '../callToAction';
import Contact from '../../contact';
import Footer from '../../../elements/footer';
import NotFound from '../../notFound';

import styles from './styles.module.css';

class Landing extends Component {
  render() {
    return (
      <>
        <main>
          <Switch>
            <Route exact path="/contact" component={Contact} />
            <Route path="/" component={CallToAction} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
      </>
    );
  }
}

export default Landing;
