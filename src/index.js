import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './App.jsx'
import { initAWS } from './aws.js'

initAWS()

ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route exact path='/' component={App} />
      </Switch>
    </div>
  </Router>,
  document.getElementById('root')
)
