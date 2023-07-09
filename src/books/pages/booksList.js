import AWS from 'aws-sdk'

export const booksList = async (event) => {
    const db = new AWS.DynamoDB.DocumentClient();

    const result = await db.scan({
        TableName: 'Books',
    }).promise()

    return result.Items
}