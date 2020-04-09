import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Navigation from 'components/partials/Navigation';
import SearchForm from 'components/rooms/SearchForm';
import LoginOtp from 'components/auth/LoginOtp';

export default () => {
  return (
    <div className="py-1r">
      <Container>
        <BrowserRouter>
          <Navigation />
          <Route exact path="/" component={SearchForm} />
          <Route exact path="/login/otp" component={LoginOtp} />
        </BrowserRouter>
      </Container>
    </div>
  );
};
