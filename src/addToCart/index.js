import { addCart } from "./pages/addCart.js"
import { cartList } from "./pages/cartList.js"
import { deleteCart } from "./pages/deleteCart.js"
import { getCart } from "./pages/getCart.js"


export const index = async (event) => {
    console.log(event)

    const pathName = event['info']['fieldName']

    switch(pathName){
        case 'addCart' : return addCart(event)
        case 'getCart' : return getCart(event)
        case 'cartList' : return cartList(event)
        case 'deleteCart' : return deleteCart(event)
        default:null
    }
}