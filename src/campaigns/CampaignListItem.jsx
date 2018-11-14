import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
class CampaignListItem extends Component {

  render() {
    return (
      <Button>
        <h5>{this.props.campaign.name}</h5>
        <h6>{this.props.overallSentiment}</h6>
      </Button>
    )
  }
}

export default CampaignListItem
