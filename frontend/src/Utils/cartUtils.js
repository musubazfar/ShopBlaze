const addDecimal = (num)=>{
    return (Math.round(num * 100)/100).toFixed(2)
}

export const updateCart = (state)=>{

            //Calculate Price
            state.itemPrice = addDecimal(state.cartItems.reduce((acc, item)=> acc + item.price * item.qty, 0));

            //Calculate shipping over 100$ free
            state.shippingPrice = addDecimal(state.itemPrice > 100 ? 0 : 10)

            //Calculate Tax price at 15%
            state.taxPrice = addDecimal(Number((0.15 * state.itemPrice).toFixed(2)));

            //Calculate Total Price
            state.totalPrice = (Number(state.itemPrice) + Number(state.taxPrice) + Number(state.taxPrice)).toFixed(2);

            //Store in localStorage
            localStorage.setItem('cart', JSON.stringify(state))

            return state
}