/** Style Imports **/
import 'normalize.css';
import 'basscss';
import './styles/main.scss';

/** END: Style Imports **/

import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes.jsx';
import store from './store';

ReactDOM.render(
  <Provider store={store}><Routes/></Provider>,
  document.getElementById('root')
);
