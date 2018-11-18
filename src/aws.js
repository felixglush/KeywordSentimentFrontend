import AWS from 'aws-sdk'

let lambda
let ddb
const region = 'us-east-1'

export const initAWS = () => {
  console.log('Init AWS')

  // Initialize the Amazon Cognito credentials provider
  AWS.config.region = region // Region
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:aabd3fb2-81d4-442e-b6e8-e90527137a1c'
  })

  lambda = new AWS.Lambda({region: region, apiVersion: '2015-03-31'})
  ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'})
}

// ******************** AWS Lambda ********************

// Async lambda call
export const callLambda = (payload, callback) => {
  console.log('callLambda payload', payload)
  const pullParams = {
    FunctionName: 'serverless-keywordtracker-dev-hello',
    InvocationType: 'RequestResponse',
    LogType: 'None',
    Payload: payload
  }

  lambda.invoke(pullParams, function (error, data) {
    if (error) {
      console.log('Error!', error)
    } else {
      console.log('AWS Lambda raw data', data)
      const pullResults = JSON.parse(data.Payload)
      console.log('AWS Lambda Pull results', pullResults)
      callback(pullResults)
      return pullResults
    }
  })
}

// ******************** DynamoDB functions ********************

// A DynamoDB trigger is enabled on the Campaigns table so when the
// campaign is put into the table, an AWS Lambda function is called
// that creates a table for this campaign
export const addCampaign = (campaign, callback) => {
  console.log('aws::addCampaign', campaign)
  const params = {
    TableName: 'Campaigns',
    Item: {
      'CampaignName': {S: campaign.name},
      'sources': {SS: campaign.sources},
      'keywords': {SS: campaign.keywords},
      'subreddits': {SS: campaign.subreddits}
    }
  }

  console.log('aws::addCampaign params', params)

  ddb.putItem(params, function (error, data) {
    if (error) {
      console.log('Error! addCampaign', error)
    } else {
      console.log('Success! aws::addCampaign data', data)
      callback(campaign)
      return data
    }
  })
}

export const fetchCampaigns = (callback) => {
  console.log('aws::fetchCampaigns')
  const params = {
    TableName: 'Campaigns'
  }

  ddb.scan(params, function (error, data) {
    if (error) {
      console.log('Error! aws::fetchCampaigns', error)
    } else {
      console.log('Success! aws::fetchCampaigns data', data)
      callback(data)
      return data
    }
  })
}

export const deleteCampaign = (campaignName, callback) => {
  console.log('aws:: deleting campaign', campaignName)
  const params = {
    TableName: 'Campaigns',
    Key: {
      'CampaignName': {S: campaignName}
    }
  }

  ddb.deleteItem(params, function (error, data) {
    if (error) {
      console.log('Error! aws::deleteCampaign', error)
    } else {
      console.log('Success! aws::deleteCampaign data', data)
      callback()
      return data
    }
  })
}

export const getCampaignDataUponTableCreation = (campaignName, callback) => {
  var params = {
    TableName: campaignName.replace(/\s/g, '')
  }

  ddb.waitFor('tableExists', params, function (err, data) {
    if (err) console.log(err, err.stack) // an error occurred
    else {
      console.log('table exists success', data)
      setTimeout(function () {
        getCampaignData(campaignName, callback)
      }, 2000)
    }
  })
}

export const getCampaignData = (campaignName, callback) => {
  console.log('aws::getCampaignData', campaignName)
  const params = {
    TableName: campaignName.replace(/\s/g, ''),
    Key: {
      'id': {
        'N': '1'
      }
    }
  }

  ddb.getItem(params, function (error, data) {
    if (error) {
      console.log('Error! aws::getCampaignData', error)
    } else {
      console.log('Success! aws::getCampaignData data', data)
      callback(data)
      return data
    }
  })
}
