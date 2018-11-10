import React, { Component } from 'react'
import { callLambda } from '../aws.js'
import SentimentInfo from '../SentimentInfo.jsx'

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
    search()
  }

  search() {
    const payload = {
      "keywords_list": this.props.campaign.keywords,
      "subreddits_list": this.props.campaign.subreddits,
      "sources": this.props.campaign.sources
    }

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

    const infoObject = {

    }

    return (
      <div>
        <CampaignInfo info={}/>
        <Button onClick={this.handleEditCampaignClick}>Edit Campaign</Button>
        {sentimentInfo}
      </div>
    )
  }
}

Campaign.

export default Campaign