import AWS from 'aws-sdk'

export const deleteCart = async (event) => {
    console.log(event);

    const db = new AWS.DynamoDB.DocumentClient();

    const result = await db.delete({
        TableName: 'Cart',
        Key:{
            "userId":event.arguments.userId
        }
    }).promise()

    return 'Deleted Successfully'
}