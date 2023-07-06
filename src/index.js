
export const index = async (event) => {
    console.log(event);
    return {
        statusCode:200,
        body:JSON.stringify('Success!')
    }
}