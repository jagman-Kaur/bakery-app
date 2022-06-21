import classes from './BakeryItemForm.module.css'
import Input from './Input'
import { useRef } from 'react'

function BakeryItemForm(props){
    const amountInputRef = useRef()
    function submitHandler(event){
        event.preventDefault()
        props.onAddToCart(amountInputRef.current.value)
    }
    return <form className={classes.form} onSubmit={submitHandler}>
        <Input label='Amount' ref = {amountInputRef} input={{
            id: 'amount'    ,
            type: 'number',
            min: 1,
            max: 5,
            defaultValue: 1
        }}/>
        <button>+ Add</button>
    </form>
}

export default BakeryItemForm