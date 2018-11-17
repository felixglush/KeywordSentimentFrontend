import React, { Component } from 'react'
import SearchForm from '../searchComponents/SearchForm.jsx'
import { addCampaign } from '../aws.js'
import { Redirect } from 'react-router-dom'

class CreateCampaign extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      result: null
    }
    this.handleReturnedResult = this.handleReturnedResult.bind(this)
  }

  handleReturnedResult(campaign) {
    console.log("CreateCampaign::handleReturnedResult: campaign", campaign)

    // aws dynamo db, create this campaign in Campaign table
    addCampaign(campaign, (resultDynamoDB) => {
      console.log("Created campaign. result: ", resultDynamoDB)
      // then open view of the Campaign with results (i.e. Campaign component)
      this.setState({redirect: true, result: campaign})
    })
  }

  render () {
    if (this.state.redirect) {
      const campaign = this.state.result
      return <Redirect to={{pathname: `/campaign/` + campaign.name, state: campaign}} />
    }

    return (
      // render of the Campaign parameters to search for
      <SearchForm
        listOfCampaignNames={this.props.location.state}
        onCreate={this.handleReturnedResult}/>
    )
  }
}

export default CreateCampaign
