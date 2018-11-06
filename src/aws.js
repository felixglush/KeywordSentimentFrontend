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
    IdentityPoolId: 'us-east-1:cf36a002-3f60-4b38-917d-196a9cfc7ba3'
  })

  lambda = new AWS.Lambda({region: region, apiVersion: '2015-03-31'})
}

export const callLambda = (payload) => {
  initLambdaRequest(payload)
  invokeLambda()
}

const initLambdaRequest = (payload) => {
  // create JSON object for parameters for invoking Lambda function
  pullParams = {
    FunctionName: 'hello',
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
