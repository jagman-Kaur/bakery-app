import {useContext, useRef} from 'react'
import AuthContext from '../../store/auth-context'
import classes from "./Auth.module.css";
import { useHistory } from "react-router-dom";

function ChangePasswordForm() {

    const history = useHistory()

    const newPasswordInputRef = useRef()
    const idToken = useContext(AuthContext).token
    function submitHandler(event){
        event.preventDefault()

        const enteredPassword = newPasswordInputRef.current.value

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCrqJVN_vLMtMQgWQhnPe7W15w-59V3ltU',{
            method: 'POST',
            body: JSON.stringify({
                idToken,
                password: enteredPassword,
                returnSecureToken: false
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            history.replace('/auth')
        })
    }
  return (
    <section className={classes.auth}>
      <h1>Change Password</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="newPass">New Password</label>
          <input
            type="password"
            id="newPass"
            minLength='7'
            required
            ref={newPasswordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>Change Password</button>
        </div>
      </form>
    </section>
  );
}

export default ChangePasswordForm
