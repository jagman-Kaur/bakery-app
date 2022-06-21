import classes from "./BakeryList.module.css";
import Card from "../UI/Card";
import BakeryItem from "./bakeryItem/BakeryItem";
import { Fragment, useEffect, useState } from "react";
import MenuHeader from "./MenuHeader";

function BakeryList(props) {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function loadData() {
      console.log("loading");
      const response = await fetch(
        "https://bakery-app-5f5c2-default-rtdb.firebaseio.com/BakeryItems.json"
      );

      if (!response.ok) {
        console.log("error");
        throw new Error("Unable to load data");
      }

      const responseData = await response.json();
      const loadedBakeryItems = [];

      for (const key in responseData) {
        if(props.category === 'all'){
          loadedBakeryItems.push({
            id: key,
            name: responseData[key].name,
            price: responseData[key].price,
            category: responseData[key].category,
          });
        }
        else if (responseData[key].category === props.category) {
          loadedBakeryItems.push({
            id: key,
            name: responseData[key].name,
            price: responseData[key].price,
            category: responseData[key].category,
          });
        }
      }
      setMeals(loadedBakeryItems);
      setIsLoading(false);
    }

    loadData().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, [props.category]);

  const loadingContent = <div className={classes.loader}></div>;
  const errorContent = <div className={classes.error}>{error}</div>;
  const menu = (
    <Fragment>
      <ul className={classes.bakeryList}>
        {meals.map((bakery) => (
          <BakeryItem
            key={bakery.id}
            id={bakery.id}
            name={bakery.name}
            category={bakery.category}
            price={bakery.price}
          />
        ))}
      </ul>
    </Fragment>
  );

  return (
    <section className={classes.bakery}>
      <Card>
        <MenuHeader />
        {isLoading && loadingContent}
        {error && errorContent}
        {!isLoading && !error && menu}
      </Card>
    </section>
  );
}

export default BakeryList;
