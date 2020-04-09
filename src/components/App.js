import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Navigation from 'components/partials/Navigation';
import SearchForm from 'components/rooms/SearchForm';

export default () => {
  return (
    <div className="py-1r">
      <Container>
        <BrowserRouter>
          <Navigation />
          <Route exact path="/" component={SearchForm} />
        </BrowserRouter>
      </Container>
    </div>
  );
};
