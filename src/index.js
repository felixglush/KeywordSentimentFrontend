import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import {initAWS} from './aws.js'

initAWS()

ReactDOM.render(
  <App />, document.getElementById('root')
)
