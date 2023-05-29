const addProductToCart = (state, payload) => {

    console.log(state, payload.id)
    const updatedCart = [...state.cart];//1.copy from cart 
    const updatedItemIndex = updatedCart.findIndex((item) => item.id == payload.id);//2. find item in cart existence

    if (updatedItemIndex >= 0) {
        // existence
        const updatedItem = { ...updatedCart[updatedItemIndex] };// copy from item cart Existence
        updatedItem.quantity++; // add quantity
        updatedCart[updatedItemIndex] = updatedItem; // update cart copy
    } else {
        //new item
        updatedCart.push({ ...payload, quantity: 1 })
    }
    return {
        ...state,
        cart: updatedCart,
        total: state.total + payload.offPrice
    }
}
const removeProductToCart = (state, payload) => {
    const updatedCart = [...state.cart];//1.copy from cart 
    const updatedItemIndex = updatedCart.findIndex((item) => item.id == payload.id);
    const updatedItem = { ...updatedCart[updatedItemIndex] };
    if (updatedItem.quantity === 1) {
        const filterCart = updatedCart.filter((item) => item.id !== payload.id)
        return {
            ...state,
            cart: filterCart,
            total: state.total - payload.offPrice
        }
    } else {
        updatedItem.quantity--;
        updatedCart[updatedItemIndex] = updatedItem;
        return {
            ...state,
            cart: updatedCart,
            total: state.total - payload.offPrice
        }
    }
}
const deleteProductToCart = (state, payload) => {
    const updatedCart = [...state.cart];
    const updatedItemIndex = updatedCart.findIndex((item) => item.id == payload.id);
    if (updatedItemIndex => 0) {
        const filterCart = updatedCart.filter((item) => item.id !== payload.id)
        console.log(state.total, payload.offPrice, payload.quantity)
        return {
            ...state,
            cart: filterCart,
            total: state.total - (payload.offPrice * payload.quantity)
        }
    }
}

const CartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return addProductToCart(state, action.payLoad)
        case "REMOVE_PRODUCT":
            return removeProductToCart(state, action.payLoad)
        case "DELETE_PRODUCT":
            return deleteProductToCart(state, action.payLoad)
        default:
            return state
    }
}

export default CartReducer;