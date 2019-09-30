import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CallToAction from './callToAction';
import Contact from '../Shared/contact';
import Footer from './footer';
import NotFound from '../Shared/notFound';
import ResetEmail from './AuthModals/resetEmail';
import ResetPass from './AuthModals/resetPass';
import Login from './AuthModals/login';
import Register from './AuthModals/register';

const Landing = () => {
  return (
    <>
      <main>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/login/reset" component={ResetEmail} />
        <Route path="/auth/reset" component={ResetPass} />
        <Switch>
          <Route exact path="/contact" component={Contact} />
          <Route path="/" component={CallToAction} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </>
  );
};
export default Landing;
