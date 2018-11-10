import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import { fetchCampaigns } from '../aws.js'

// A list of all user created Campaigns
class CampaignsOverview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      campaigns: []
    }
    this.handleCampaignSelection = this.handleCampaignSelection.bind(this)
    this.createNewCampaign = this.createNewCampaign.bind(this)
  }

  componentDidMount() {
    // fetch campaigns
    console.log("CampaignsOverview, fetching campaigns")
    fetchCampaigns((resultDynamoDB) => {
      console.log('fetched campaigns', resultDynamoDB)
      this.setState({campaigns:resultDynamoDB})
    })
  }

  handleCampaignSelection(campaign) {
    console.log("Campaign selected", campaign.name)
    // set route
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

  render() {
    const campaignsList = this.state.campaigns.map((campaign) =>
      <ListGroupItem
        key={campaign.name}
        onClick={this.handleCampaignSelection(campaign)}>
        {campaign.name}
      </ListGroupItem>
    )

    return (
      <div>
        <ListGroup>{campaignsList}</ListGroup>
        <Button
          onClick={this.createNewCampaign}>
          Create new campaign
        </Button>
      </div>
    )
  }
}

export default CampaignsOverview
