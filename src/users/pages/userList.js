import AWS from 'aws-sdk'

export const userList = async(event) => {
    console.log('userList',event)

    const db = new AWS.DynamoDB.DocumentClient();

    const result = await db.scan({
        TableName:'Users',
    }).promise()

    return result.Items
}