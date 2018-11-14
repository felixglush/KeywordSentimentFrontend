import React, { Component } from 'react'
import SearchForm from '../searchComponents/SearchForm.jsx'
import { addCampaign } from '../aws.js'

class CreateCampaign extends Component {

  handleReturnedResult(campaign) {
    console.log("CreateCampaign::handleReturnedResult: campaign", campaign)

    // aws dynamo db, create this campaign in Campaign table
    addCampaign(campaign, (resultDynamoDB) => {
      console.log("Created campaign. result: ", resultDynamoDB)
      // then open view of the Campaign with results (i.e. Campaign component)
      
    })
  }

  render () {
    return (
      // render of the Campaign parameters to search for
      <SearchForm
        listOfCampaignNames={this.props.location.state}
        onCreate={this.handleReturnedResult}/>
    )
  }
}

export default CreateCampaign
