import classes from './BakeryItem.module.css'
import BakeryItemForm from './BakeryItemForm'
//import CartContext from '../../../store/cart-context'
//import { useContext } from 'react'
import {cartActions} from '../../../store/cart-slice'
import {useDispatch} from 'react-redux'

function BakeryItem(props){
    const price = `$${props.price.toFixed(2)}`
    //const cartCtx = useContext(CartContext)
    const dispatch = useDispatch()
    function addItemToCart(enteredAmount){
        dispatch(cartActions.addItem({
            id: props.id,
            name: props.name,
            price: props.price,
            amount: +enteredAmount
        }))
    }
    return <li className={classes.bakery}>
        <div>
            <h3>{props.name}</h3>
            <div className={classes.price}>{price}</div>
        </div>
        <div>
            <BakeryItemForm onAddToCart = {addItemToCart}/>
        </div>
    </li>
}

export default BakeryItem