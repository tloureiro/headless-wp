import React, { Component } from 'react'
import { Router, Route, Switch, Link } from 'react-static'
import { hot } from 'react-hot-loader'

import Home from 'containers/Home'
import Blog from 'containers/Blog'
import NotFound from 'containers/404'

import './app.css'

class App extends Component {

  render() {

    return (
      <Router>
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/blog/">Blog</Link>
          </nav>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/blog" component={Blog} />
              <Route component={NotFound}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default hot(module)(App)
