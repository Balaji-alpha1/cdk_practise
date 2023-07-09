import AWS from 'aws-sdk'

export const cartList = async (event) => {
    console.log(event);

    const db = new AWS.DynamoDB.DocumentClient();

    const result = await db.scan({
        TableName: 'Cart'
    }).promise()

    return result.Items
}