import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Login from './pages/Login/login';
import Register from './pages/Register/register';
import Saloon from './pages/Saloon/saloon';
import Page404 from './pages/Page404/index';
import Pedidos from './pages/Pedidos/breakfast/index';
import Kitchen from './pages/Kitchen/kitchen';
import GlobalStyle from './components/GlobalStyle';
import AllDay from './pages/Pedidos/allDay/index';
import Burguer from './pages/Pedidos/allDay/burguer';

import PrivateRoute from './service/PrivateRoute';

function Routes() {
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/register">
          <Register />
        </Route>

        <PrivateRoute exact path="/saloon">
          <Saloon />
        </PrivateRoute>

        <PrivateRoute exact path="/saloon/pedidos/:mesa">
          <Pedidos />
        </PrivateRoute>

        <PrivateRoute exact path="/kitchen">
          <Kitchen />
        </PrivateRoute>

        <Route exact path="/allday/">
          <AllDay />
        </Route>

        <Route exact path="/simpleBurguers/">
          <Burguer />
        </Route>

        <Route>
          <Page404 />
        </Route>
      </Switch>

    </Router>

  );
}

export default Routes;
