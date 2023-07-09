import { addUser } from "./pages/addUser.js";
import { userList } from "./pages/userList.js";
import { deleteUser } from "./pages/deleteUser.js";
import { updateUser } from "./pages/updateUser.js";
import { getUser } from "./pages/getUser.js";

export const index = async (event) => {

    const pathName = event['info']['fieldName']
    switch(pathName){
        case 'createUser': return await addUser(event)
        case 'usersList': return await userList(event)
        case 'getUser': return await getUser(event)
        case 'deleteUser' : return deleteUser(event)
        case 'updateUser' : return await updateUser(event)
        default: return null
    }
}