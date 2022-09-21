import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import ReviewCard from "./ReviewCard";

const RestaurantDetails = () => {
  const newItemName = useRef();
  let allRestData = useSelector((state) => state.restaurantList.restList);

  const { id } = useParams();
  const [restData, setRestData] = useState(
    allRestData.find((singleRestData) => singleRestData.id === id)
  );
  const [dbData, setDBData] = useState("");
  const [flag, setFlag] = useState(true);
  const [noMenuItemsFlag, setNoMenuItemsFlag] = useState(false);
  const [sortedMenuData, setSortedMenuData] = useState([]);
  const [showAddFood, setShowAddFood] = useState(true);

  //Fetches data from database. If none, ask to if they'd like to be the first to review an item. Else, pull the data.
  const checkDataBase = async () => {
    if (flag) {
      await fetch("/checkDB", {
        method: "post",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((response) => {
          // console.log(response);
          if (response.length === 0) {
            newRestaurant();
            setNoMenuItemsFlag(true);
          } //sets up new restaurant if not in database. That's the primary function of the whole function is suppose to do.
          if (response[0].MenuItems.length === 0) {
            setNoMenuItemsFlag(true);
          } //if there is a restaurant preexisting but there's not reviews... set flag to true
          setDBData(response);
          const unsorted = response[0].MenuItems;
          let sorted = unsorted.slice(0);
          sorted.sort((a, b) => {
            return a.Rating - b.Rating;
          });
          setSortedMenuData(sorted);
        });
    }
  };

  const newRestaurant = () => {
    const payload = {
      restaurantName: restData.name,
      ID: id,
      AvgRating: 0,
      MenuItems: [],
      Address: restData.Address,
    };
    fetch("/newRestaurant", {
      method: "post",
      body: JSON.stringify(payload),
      headers: {
        "content-Type": "application/json",
      },
    }).then((res) => console.log("new rest Response", res));
  };

  const toggleAddNewItem = () => {
    setShowAddFood(!showAddFood);
  };

  const newMenuItem = () => {
    const newFoodName = newItemName.current.value;
    toggleAddNewItem();
    if (newFoodName === "") return;
    const payload = {
      ID: id,
      foodData: {
        FoodID: uuidv4(),
        FoodName: newFoodName,
        Rating: 0,
        Reviews: [],
      },
    };
    fetch("/newFoodItem", {
      method: "post",
      body: JSON.stringify(payload),
      headers: {
        "content-Type": "application/json",
      },
    }).then((res) => console.log("new food Response", res));
    newItemName.current.value = "";
    console.log(sortedMenuData);
    setSortedMenuData([...sortedMenuData, payload.foodData]);
    setNoMenuItemsFlag(false)
  };

  useEffect(() => {
    setRestData(allRestData.find((singleRestData) => singleRestData.id === id));
    checkDataBase();
  }, [allRestData, id]);

  return (
    <div className="restaurant_info min-h-screen">
      <div className="flex flex-col items-center justify-center md:mb-10">
        <h1 className="text-3xl sm:text-5xl text-gray-800 dark:text-white font-extrabold tracking-tight mt-5">
          {restData.name}
        </h1>
        <h2 className="text-xl sm:text-2xl text-gray-800 dark:text-white font-extrabold tracking-tight">
          {restData.display_phone}
        </h2>
        {restData.location.display_address.map((addressItem, index) => {
          return (
            <h2
              key={index}
              className="text-md sm:text-lg text-gray-800 dark:text-white font-extrabold tracking-tight"
            >
              {addressItem}
            </h2>
          );
        })}
      </div>

      <div className="flex flex-col justify-center items-center text-xl font-bold mb-5">
        {noMenuItemsFlag === false ? (
          <h2>Most Popular Items</h2>
        ) : (
          "No reviews yet..."
        )}

        <div className="flex flex-col sm:flex-row md:justify-center md:space-x-10">
          {noMenuItemsFlag === false ? "" : "Be the first to add a review!"}

          {sortedMenuData.slice(0, 3).map((menuItem) => {
            return (
              <ReviewCard key={menuItem.FoodID} props={menuItem} restID={id} />
            );
          })}
        </div>
      </div>
      <div className="flex flex-col items-center mt-5">
        <h2
          className="text-xl font-bold mb-5"
          hidden={sortedMenuData.length <= 3}
        >
          More food items!
        </h2>
        {sortedMenuData.slice(3).map((menuItem) => {
          return (
            <ReviewCard key={menuItem.FoodID} props={menuItem} restID={id} />
          );
        })}
      </div>

      <div className="flex flex-col items-center mt-5">
        <div>
          <button
            className="bg-green-500 text-white text-xs py-2 px-3 m-2 rounded"
            hidden={!showAddFood}
            onClick={toggleAddNewItem}
          >
            Add new Item
          </button>
          <input
            ref={newItemName}
            hidden={showAddFood}
            placeholder="Enter Food Name"
          ></input>
          <button
            hidden={showAddFood}
            onClick={toggleAddNewItem && newMenuItem}
          >
            Add Food to List
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
