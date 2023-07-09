import AWS from 'aws-sdk'
import {v4 as uuid} from 'uuid'

export const addUser = async (event) => {
    console.log('addUser',event)

    const db = new AWS.DynamoDB.DocumentClient();
    const data = event.arguments.input

    const params = {
        'userId' : uuid(),
        'userName' : data.userName,
        'gender' : data.gender,
        'mobileNumber' : data.mobileNumber,
        "role": data.role
    }

    const result = await db.put({
        TableName: 'Users',
        Item:params
    }).promise()

    console.log('result',result)

    return 'Added Successfully'
}