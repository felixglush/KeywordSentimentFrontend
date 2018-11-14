import React, { Component } from 'react'
import Campaign from './Campaign.jsx'
import CampaignListItem from './CampaignListItem.jsx'
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import { fetchCampaigns } from '../aws.js'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

// A list of all user created Campaigns
class CampaignsOverview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      campaigns: []
    }
  }

  componentDidMount() {
    // fetch campaigns
    console.log("CampaignsOverview::componentDidMount, fetching campaigns")
    fetchCampaigns((resultDynamoDB) => {
      console.log('fetched campaigns', resultDynamoDB)
      this.setState({ campaigns:resultDynamoDB })
    })
  }

  render() {
    let listOfCampaignNames = []
    this.state.campaigns.map((campaign) => {
       listOfCampaignNames.push(campaign.name)
    })
    console.log("CampaignsOverview::listOfCampaignNames", listOfCampaignNames)

    const campaignsList = this.state.campaigns.map((campaign) =>
      <Link to={{pathname: `/campaign/` + campaign.name, state: campaign}}>
          <CampaignListItem
            key={campaign.name}
            campaign={campaign}
            overallSentiment={"placeholder sentiment"}
          />
      </Link>
    )

    return (
      <div>
        <ListGroup>{campaignsList}</ListGroup>
        <Link to={{pathname: '/createCampaign/', state: listOfCampaignNames}}>
          <Button>
            Create campaign
          </Button>
        </Link>
      </div>
    )
  }
}

export default CampaignsOverview
