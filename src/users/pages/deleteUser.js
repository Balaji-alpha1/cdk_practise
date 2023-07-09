import AWS from 'aws-sdk'

export const deleteUser = async (event) => {
    console.log('deleteUser',event)

    const db = new AWS.DynamoDB.DocumentClient()

    const result = await db.delete({
        TableName:'Users',
        Key:{
            'userId':event.arguments.userId
        }
    }).promise()
    console.log(result)
    return 'Deleted Successfully!'
}

