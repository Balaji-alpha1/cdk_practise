import AWS from 'aws-sdk'
import {v4 as uuid} from 'uuid'

export const createBook = async (event) => {
    console.log('createBook', event)

    const db = new AWS.DynamoDB.DocumentClient();

    const params = {
        bookId : uuid(),
        bookName : event.arguments.input.bookName,
        totalPages: event.arguments.input.totalPages
    }

    const result = await db.put({
        TableName: 'Books',
        Item:params
    }).promise()

    return 'Books Added'
}