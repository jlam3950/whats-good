import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const RestaurantDetails = () => {
  let allRestData = useSelector((state) => state.restaurantList.restList);

  const { id } = useParams();
  const [restData, setRestData] = useState("");
  const [dbData, setDBData] = useState("");
  const [flag, setFlag] = useState(true);
  const [noReviewsFlag, setNoReviewsFlag] = useState(true)

  // //Fetch data from database. If none, ask to if they'd like to be the first to review an item. Else, pull the data.
  const checkDataBase = async () => {
    if (flag) {
      await fetch("/checkDB", {
        method: "get",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          setDBData(response);
          //if response equals empty or says there's no reviews (depending how we set it up) setNoReviewsFlag(true) else setNoReviewsFlag(false)
        });
        setFlag(false)

    }
  };
  //TEST Fetch
  const TestCheck = async () => {
      await fetch("/check", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
        });
  };

  useEffect(() => {
    setRestData(allRestData.find((singleRestData) => singleRestData.id === id));
  }, [allRestData, id]);

  const checkFunction = () => {
    TestCheck();
    //console.log(restData);
  };

  return (
    <div class="restaurant_info">
      <h1>{restData.name}</h1>
      {/* {restData.location.display_address.map((addressItem, index) => {        //This code is causing problems
        return <h2 key={index}>{addressItem}</h2>;
      })} */}
      <h2>{restData.display_phone}</h2>
      {/* <button onClick={checkFunction}>Button</button> Test button to check functions */}
      {/* Render if (noReviewFlags === true) 
      "Be the first to leave a review" 
      "Add menu item"
      "Add your review" (description, rating, menuitem?)

      Render if there is reviews (noReviewFlags===false)
      Top rated food items (3 items depending number of reviews) ( we can limit this to 3 stars and above)
      item 1
      item 2
      item 3

      More items
      item 4
      item 5 .... map
      */}
    </div>
  );
};

export default RestaurantDetails;

