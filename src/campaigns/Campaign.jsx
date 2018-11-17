import React, { Component } from 'react'
import { callLambda } from '../aws.js'
import SentimentInfo from '../SentimentInfo.jsx'
import { Button } from 'react-bootstrap'
import { deleteCampaign } from '../aws.js'
import { Redirect } from 'react-router-dom'

// search for results happens here, SentimentInfo goes here
class Campaign extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: null,
      redirectToOverview: false
    }
    this.handleDeleteCampaignClick = this.handleDeleteCampaignClick.bind(this)
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

    console.log("Campaign::mock payload", mockPayload)
    callLambda(JSON.stringify(payload), (resultLambda) => {
      const result = JSON.parse(JSON.parse(resultLambda.body).result)
      console.log("Campaign::Search", result)
      this.setState({ result })
    })
  }

  handleEditCampaignClick() {
    console.log("Campaign::handleEditCampaignClick")
  }

  handleDeleteCampaignClick() {
    console.log('Campaign::handleDeleteCampaignClick')
    const passedState = this.props.location.state
    const name = passedState.name
    deleteCampaign(name, () => this.setState({redirectToOverview: true}))
  }

  render() {
    if (this.state.redirectToOverview) {
      return <Redirect to='/' />
    }

    let sentimentInfo
    if (this.state.result !== null)
      sentimentInfo = <SentimentInfo result={this.state.result}/>
    return (
      <div>
        <Button onClick={this.handleEditCampaignClick}>Edit Campaign</Button>
        <Button onClick={this.handleDeleteCampaignClick}>Delete</Button>
        {sentimentInfo}
      </div>
    )
  }
}

export default Campaign
