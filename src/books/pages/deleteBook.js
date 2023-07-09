import AWS from 'aws-sdk';

export const deleteBook = async (event) => {
    const db = new AWS.DynamoDB.DocumentClient();

    const result = await db.delete({
        TableName: 'Books',
        Key : {
            "bookId" : event.arguments.bookId
        }
    }).promise()

    return 'Books Deleted'
}