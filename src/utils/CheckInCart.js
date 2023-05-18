export function checkInCart(cart, _id) {
    return cart.find((item) => item._id == _id)
}