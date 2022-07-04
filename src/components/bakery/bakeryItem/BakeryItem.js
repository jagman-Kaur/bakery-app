import classes from './BakeryItem.module.css'
import BakeryItemForm from './BakeryItemForm'
//import CartContext from '../../../store/cart-context'
//import { useContext } from 'react'
import {cartActions} from '../../../store/cart-slice'
import {useDispatch} from 'react-redux'
import { useContext } from 'react'
import AuthContext from '../../../store/auth-context'

function BakeryItem(props){
    const price = `$${props.price.toFixed(2)}`
    const isLoggedIn = useContext(AuthContext).isLoggedIn
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
        {isLoggedIn &&
        <div>
            <BakeryItemForm onAddToCart = {addItemToCart}/>
        </div>}
    </li>
}

export default BakeryItem