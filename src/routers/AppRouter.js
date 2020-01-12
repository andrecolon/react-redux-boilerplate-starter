import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// custom components
import DashboardPage from '../components/DashboardPage';
import LoginPage from '../components/LoginPage';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <PublicRoute path="/" component={LoginPage} exact />
      <PrivateRoute path="/dashboard" component={DashboardPage} exact />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);

export default AppRouter;
