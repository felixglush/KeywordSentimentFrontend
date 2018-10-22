import React, { Component } from 'react'
import ListOfResults from './resultListComponents/ListOfResults.jsx'
import './App.css'

class SentimentInfo extends Component {
  render() {
    console.log("SentimentInfo, this.props.result: ", this.props.result)
    return (
      <div className="info-section">
        <ListOfResults result={this.props.result}/>
      </div>
    )
  }
}

export default SentimentInfo
