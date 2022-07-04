import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  userEmail: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

function calculateRemainingTime(expirationTime){
  const currentTime = new Date().getTime()
  const adjExpirationTime = new Date(expirationTime).getTime()

  const remainingDuration = adjExpirationTime - currentTime

  return remainingDuration
}
export function AuthContextProvider(props) {
  const initialToken = localStorage.getItem('token')
  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState('')

  const userIsLoggedIn = !!token;

  function logoutHandler() {
    setToken(null);
    setEmail('')
    localStorage.removeItem('token')
  }

  function loginHandler(token, usrEmail, expirationTime) {
    setToken(token);
    setEmail(usrEmail);
    localStorage.setItem('token', token)
    const remainingTime = calculateRemainingTime(expirationTime)

    setTimeout(logoutHandler, remainingTime)
  }

  const contextValue = {
    token,
    userEmail: email,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
