import { Fragment } from "react";
import Intro from "../components/layout/Intro";
import bakeryImg from "../assets/bakery_main.jpg";
import "./PageStyles.css";

const MainPage = () => {
  return (
    <Fragment>
        <div className="split left" >
          <Intro />
        </div>
        <div className="split right">
          <img src={bakeryImg} alt="J's Bakery"/>
        </div>
    </Fragment>
  );
};

export default MainPage;
