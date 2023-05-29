export function checkInCart(cart, id) {
    return cart.find((item) => item.id == id)
}