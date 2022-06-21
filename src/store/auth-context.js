import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  userEmail: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export function AuthContextProvider(props) {
  const initialToken = localStorage.getItem('token')
  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState('')

  const userIsLoggedIn = !!token;

  function loginHandler(token, usrEmail) {
    setToken(token);
    setEmail(usrEmail);
    localStorage.setItem('token', token)
  }
  function logoutHandler() {
    setToken(null);
    setEmail('')
    localStorage.removeItem('token')
  }

  const contextValue = {
    token,
    userEmail: email,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  console.log(contextValue);
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
