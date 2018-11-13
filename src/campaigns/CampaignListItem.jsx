import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class CampaignListItem extends Component {

  render() {
    return (
      <div>
        <h5>{this.props.campaign.name}</h5>
        <h6>{this.props.overallSentiment}</h6>
      </div>
    )
  }
}

export default CampaignListItem
