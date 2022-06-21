import Card from "../UI/Card";
import classes from "./Intro.module.css";

function Intro() {
  return (
    <section className={classes.intro}>
      <Card>
        <h2 className={classes["header-text"]}>WELCOME!</h2>
        <div className={classes["para-text"]}>
          <p>
            We at J's bakery are delighted to offer you the best bakery in town.
          </p>
          <p>Please login to view our menu and place orders.</p>
        </div>
      </Card>
    </section>
  );
}

export default Intro;
