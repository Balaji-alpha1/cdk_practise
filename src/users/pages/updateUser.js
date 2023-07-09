import AWS from 'aws-sdk'

export const updateUser = async (event) => {
    console.log('updateUser',event);

    const db = new AWS.DynamoDB.DocumentClient()

    let data = event.arguments.input

    delete data.userId

    let updateExpression = "set";
    const ExpressionAttributeValues = {};

    Object.keys(data).forEach(key => {
        updateExpression += ` ${key} = :${key} ,`;
        ExpressionAttributeValues[`:${key}`] = data[key];
      });

      updateExpression = updateExpression.slice(0,-1).trim()

      console.log(updateExpression, ExpressionAttributeValues)

    const result = await db.update({
        TableName:'Users',
        Key:{
            'userId' : event.arguments.input.userId
        },
        // UpdateExpression:updateExpression,
        // ExpressionAttributeValues:ExpressionAttributeValues
        UpdateExpression: 'set userName = :userName',
        ExpressionAttributeValues:{
            ':userName' : event.arguments.input.userName
        },
        ReturnValues: 'ALL_NEW'
    }).promise()

    return 'Data modified successfully'
}