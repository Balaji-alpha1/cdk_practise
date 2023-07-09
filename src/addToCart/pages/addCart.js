import AWS from 'aws-sdk';

export const addCart = async (event) => {
    console.log(event)
    const db = new AWS.DynamoDB.DocumentClient();

    const params = {
        "userId" : event.arguments.input.userId,
        "addedCartId" : [event.arguments.input.addedCartId]
    }

    const result = await db.put({
        TableName:'Cart',
        Item:params
    }).promise()

    return 'Added to Cart'
}