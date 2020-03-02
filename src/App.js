import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import MobileState from './context/mobile/MobileState';
import AlertState from './context/alert/AlertState';

import './App.css';

const App = () => {
  return (
    <MobileState>
      <AlertState>
        <Router>
          <div className='App'>
            <Navbar />
            <div className='container'>
              <Alert />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </MobileState>
  );
};

export default App;
