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
      campaignSelected: false,
      selectedCampaign: null,
      campaigns: []
    }
  //  this.handleCampaignSelection = this.handleCampaignSelection.bind(this)
    this.createNewCampaign = this.createNewCampaign.bind(this)
    this.selectedCampaign = this.selectedCampaign.bind(this)
  }

  componentDidMount() {
    // fetch campaigns
    console.log("CampaignsOverview, fetching campaigns")
    fetchCampaigns((resultDynamoDB) => {
      console.log('fetched campaigns', resultDynamoDB)
      this.setState({ campaigns:resultDynamoDB })
    })
  }

  createNewCampaign() {
    console.log("Create new campaign")
    let names = []
    this.state.campaigns.map((campaign) => {
      names.push(campaign.name)
    })

    console.log("CampaignsOverview::All campaign names", names)
    // pass names to CreateNewCampaign component with prop: names

  }

  selectedCampaign(campaign) {
    console.log("YOOO")
    this.setState({selectedCampaign: campaign, campaignSelected: true})
  }

  render() {
    console.log("campaign selected ", this.state.campaign)
    const campaignsList = this.state.campaigns.map((campaign) =>
      <Link to={`/campaign/` + campaign.name}>
        <ListGroupItem
          onClick={() => this.selectedCampaign(campaign)}
          key={campaign.name}>
            <CampaignListItem
              campaign={campaign}
              overallSentiment={"placeholder sentiment"}

            />
        </ListGroupItem>
      </Link>
    )

    return (
      <div>
        <ListGroup>{campaignsList}</ListGroup>
        <Button
          onClick={this.createNewCampaign}>
          Create campaign
        </Button>
        <Route
          path='/campaign/:name'
          render={(props) => <Campaign {...props} campaign={this.state.campaign} />} />
      </div>
    )
  }
}

export default CampaignsOverview
