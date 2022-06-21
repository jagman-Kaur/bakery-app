import AuthContext from '../store/auth-context'
import { useContext } from 'react'

import {Route} from 'react-router-dom'
import { Redirect } from 'react-router-dom'

function ProtectedRoute(props){
    const isLoggedIn = useContext(AuthContext).isLoggedIn
    return (
        <Route path={props.path} render={() => {
            return isLoggedIn ? props.children : <Redirect to = '/auth'/>
        }}/>
    )
}

export default ProtectedRoute