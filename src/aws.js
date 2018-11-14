import AWS from 'aws-sdk'

let lambda
let ddb
let pullParams
let pullResults // create variable to hold data returned by the Lambda function
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
  initLambdaRequest(payload)
  invokeLambda(callback)
}

const initLambdaRequest = (payload) => {
  // create JSON object for parameters for invoking Lambda function
  pullParams = {
    FunctionName: 'serverless-keywordtracker-dev-hello',
    InvocationType: 'RequestResponse',
    LogType: 'None',
    Payload: payload
  }
}

const invokeLambda = (callback) => {
  lambda.invoke(pullParams, function (error, data) {
    if (error) {
      console.log('Error!', error)
    } else {
      pullResults = JSON.parse(data.Payload)
      console.log('Pull results', pullResults)
      callback(pullResults)
      return pullResults
    }
  })
}

// ******************** DynamoDB functions ********************

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
