import React, { Component } from 'react'
import SearchInput from './SearchInput.jsx'
import SentimentInfo from './SentimentInfo.jsx'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: null
    }
  }

  handleReturnedResult = (result) => {
    console.log('App, returned result:', result)
    this.setState({result})
  }

  render() {
    let sentimentInfo
    if (this.state.result !== null) {
      sentimentInfo = <SentimentInfo result={this.state.result}/>
    }

    return (
      <div className="App">
        <SearchInput onSearch={this.handleReturnedResult}/>
        {sentimentInfo}
      </div>
    )
  }
}

export default App
