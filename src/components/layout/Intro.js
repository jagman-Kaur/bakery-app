import Card from "../UI/Card";
import classes from "./Intro.module.css";
import { useHistory } from "react-router-dom";

function Intro() {
  const history = useHistory();
  function menuHandler() {
    history.push("/menu/all");
  }
  return (
    <section className={classes.intro}>
      <Card>
        <h2 className={classes["header-text"]}>WELCOME!</h2>
        <div className={classes["para-text"]}>
          <p>
            We at J's bakery are delighted to offer you the best bakery in town.
          </p>
          <p>Please login to place orders.</p>
          <div className={classes.actions}>
            <button className={classes.button} onClick={menuHandler}>
              Our Menu
            </button>
          </div>
        </div>
      </Card>
    </section>
  );
}

export default Intro;
