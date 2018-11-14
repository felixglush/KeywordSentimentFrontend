import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './App.jsx'
import Campaign from './campaigns/Campaign.jsx'
import CreateCampaign from './campaigns/CreateCampaign.jsx'
import { initAWS } from './aws.js'

initAWS()

ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/campaign/:name' component={Campaign} />
        <Route path='/createCampaign/' component={CreateCampaign} />
      </Switch>
    </div>
  </Router>,
  document.getElementById('root')
)
