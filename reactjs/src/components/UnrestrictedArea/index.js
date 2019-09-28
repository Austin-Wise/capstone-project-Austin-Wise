import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CallToAction from './callToAction';
import Contact from '../Shared/contact';
import Footer from './footer';
import NotFound from '../Shared/notFound';
import ResetPass from './AuthModals/resetPass';

const Landing = () => {
  return (
    <>
      <main>
        <Switch>
          <Route exact path="/contact" component={Contact} />
          <Route path="/" component={CallToAction} />
          <Route component={NotFound} />
        </Switch>
        <Route path="/auth/reset" component={ResetPass} />
      </main>
      <Footer />
    </>
  );
};
export default Landing;
