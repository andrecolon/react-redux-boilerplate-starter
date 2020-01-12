// 3rd party
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// 3rd party CSS
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';
// custom JS
// firebase (Database)
import { firebase } from './firebase/firebase';
// Redux store
import configureStore from './store/configureStore'; // Redux store
// actions
import { login, logout } from './actions/auth';
// selectors
// routes
import AppRouter, { history } from './routers/AppRouter';
import LoadingPage from './components/LoadingPage';
// custom CSS
import './styles/styles.scss';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

// check if rendered before rendering
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    hasRendered = true;
    ReactDOM.render(jsx, document.getElementById('root'));
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('root'));

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(login(user.uid));
    renderApp();
    if (history.location.pathname === '/') {
      history.push('/dashboard');
    }
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});
