import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import App from './App.jsx'
import CampaignsOverview from './campaigns/CampaignsOverview.jsx'
import { initAWS } from './aws.js'

initAWS()

ReactDOM.render(
  <Router>
    <div>
      <aside>
        <Link to={`/`}>Dashboard </Link>
        <Link to={`/campaigns`}> Campaigns </Link>
      </aside>

      <main>
        <Route exact path='/' component={App} />
        <Route path='/campaigns' component={CampaignsOverview} />
      </main>

    </div>
  </Router>,
  document.getElementById('root')
)
