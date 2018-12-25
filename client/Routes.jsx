import React from 'react';
import store from './store';
import {Route, IndexRoute, Router, browserHistory} from 'react-router';
// var async = require('asyncawait/async');
// import await = require('asyncawait/await');

//containers
import HomepageContainer from './containers/HomepageContainer';
// import ToDoContainer from './containers/ToDoContainer';

//action-creators
// import {to}
// import {checkLoginStatus} from './actions/user';
import {getAllToDos} from './actions/todo';

//components
import Index from './components/Index';


//onEnters
function indexEnter() {
  store.dispatch(getAllToDos());
}


export default function Routes() {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Index}>
       <IndexRoute component={HomepageContainer} onEnter={indexEnter} />
     </Route>
    </Router>
  );
}
