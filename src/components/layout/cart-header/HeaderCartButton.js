import { useEffect, useState } from "react"
import CartIcon from "./CartIcon"
import classes from './HeaderCartButton.module.css'
import {useSelector} from 'react-redux'

function HeaderCartButton (props){

    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false)
    const items = useSelector(state => state.items)

    useEffect(() => {
        if(items.length === 0){
            return
        }
        setBtnIsHighlighted(true)

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false)
        }, 300)

        return () => {
            clearTimeout(timer)
        }
    }, [items])

    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump: ''}`
    return (
        <button onClick = {props.showCart} className={btnClasses}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>
                {items.reduce((curNumber, item) => {
                    return curNumber+item.amount
                }, 0)}
            </span>
        </button>
    )
}

export default HeaderCartButton