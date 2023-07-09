import AWS from 'aws-sdk'

export const getBook = async (event) => {

    const db = new AWS.DynamoDB.DocumentClient();

    const result = await db.get({
        TableName:'Books',
        Key:{
            "bookId":event.arguments.bookId
        }
    }).promise()

    return result.Item
}