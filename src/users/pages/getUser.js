import AWS from 'aws-sdk';

export const getUser = async (event) => {
    console.log('getUser',event)

    const db = new AWS.DynamoDB.DocumentClient();

    const result = await db.get({
        TableName:'Users',
        Key:{'userId':event.arguments.userId}
    }).promise()

    return result.Item
}