import AuthForm from "../components/Authentication/AuthForm";
import "./PageStyles.css";
import bakeryImg from '../assets/bakery_main.jpg'
import {Fragment} from 'react'

function AuthPage() {
  return (
    <Fragment>
      <div className="split left">
        <AuthForm />
      </div>
      <div className="split right">
        <img src={bakeryImg} alt="J's Bakery"/>
      </div>
    </Fragment>
  );
}

export default AuthPage;
