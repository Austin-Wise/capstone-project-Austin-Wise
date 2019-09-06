import React from 'react';

import { Button, NavLink } from 'reactstrap';

import { NavLink as RRNavLink } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div>
      <h2>It&apos;s not you, it&apos;s us</h2>
      <p>
        This page is undergoing maintenance. Please check again later. Sorry for
        any inconvenience this may have caused.
      </p>
      <NavLink tag={RRNavLink} to="/contact">
        <Button color="info">Contact Us</Button>
      </NavLink>
      <NavLink tag={RRNavLink} to="/">
        <Button color="default">Back to Home</Button>
      </NavLink>
    </div>
  );
};

export default ErrorPage;
