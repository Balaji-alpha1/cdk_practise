import AWS from 'aws-sdk'

export const getCart = async (event) => {
    console.log(event);

    const db = new AWS.DynamoDB.DocumentClient();

    const result = await db.get({
        TableName: 'Cart',
        Key:{
            "userId":event.arguments.userId
        }
    }).promise()

    return result.Item
}