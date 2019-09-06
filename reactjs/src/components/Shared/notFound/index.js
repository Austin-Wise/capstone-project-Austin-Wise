import React from 'react';

import { Button, NavLink } from 'reactstrap';

import { NavLink as RRNavLink } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h2>We can’t find the page you’re looking for</h2>
      <p>
        Make sure you&apos;ve typed the URL correctly. If you&apos;re still
        having difficulty, contact us and we’ll help you find the information
        you need.
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

export default NotFound;
