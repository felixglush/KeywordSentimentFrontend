import React, { Component } from 'react'
import { callLambda } from '../aws.js'
import SentimentInfo from '../SentimentInfo.jsx'
import { Button } from 'react-bootstrap'

// search for results happens here, SentimentInfo goes here
class Campaign extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: null
    }
  }

  componentDidMount() {
    // callLambda with the campaign's parameters
    const passedState = this.props.location.state
    console.log("Campaign::passedState", passedState)
    const payload = {
      "keywords_list": passedState.keywords,
      "subreddits_list": passedState.subreddits,
      "sources": passedState.sources
    }

    console.log("Campaign::payload", payload)

    const mockPayload = {
      "keywords_list": ["the"],
      "subreddits_list": ["uwaterloo"],
      "sources": ["reddit"]
    }

    callLambda(JSON.stringify(mockPayload), (resultLambda) => {
      const result = JSON.parse(JSON.parse(resultLambda.body).result)
      console.log("Campaign::Search", result)
      this.setState({ result })
    })
  }


  handleEditCampaignClick() {
    console.log("Campaign::handleEditCampaignClick")
  }

  render() {
    let sentimentInfo
    if (this.state.result !== null)
      sentimentInfo = <SentimentInfo result={this.state.result}/>
    return (
      <div>
        <Button onClick={this.handleEditCampaignClick}>Edit Campaign</Button>
        {sentimentInfo}
      </div>
    )
  }
}

export default Campaign
