import AWS from 'aws-sdk'

let lambda
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
}

export const callLambda = (payload) => {
  console.log('callLambda payload', payload)
  initLambdaRequest(payload)
  invokeLambda()
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

const invokeLambda = () => {
  lambda.invoke(pullParams, function (error, data) {
    if (error) {
      console.log('Error!', error)
    } else {
      pullResults = JSON.parse(data.Payload)
      console.log('Pull results', pullResults)
    }
  })
}
