import { booksList } from "./pages/booksList.js"
import { createBook } from "./pages/createBook.js"
import { deleteBook } from "./pages/deleteBook.js"
import { getBook } from "./pages/getBook.js"


export const index = async (event) => {
    console.log('index',event)

    const pathName = event['info']['fieldName']
    switch(pathName){
        case 'createBook': return createBook(event)
        case 'booksList' : return booksList(event)
        case 'getBook' : return getBook(event)
        case 'deleteBook' : return deleteBook(event)
        default : return null
    }
}