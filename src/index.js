import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
//Grid
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
ReactDOM.render(
  <HashRouter history={ history }>
    <App />
  </HashRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
