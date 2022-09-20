import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { SelectUsername } from "../redux/loginSlice";
import ReactStars from "react-rating-stars-component";

const ReviewCard = ({ props, restID }) => {
  const [showReviews, setShowReviews] = useState(true);
  const [showForm, setShowForm] = useState(true);
  const [userRated, setUserRated] = useState();
  const userReview = useRef(null);
  const username = useSelector(SelectUsername);

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const ratingChanged = (newRating) => {
    setUserRated(newRating);
  };
  console.log(username)
  // NEW REVIEW
  const newReview = () => {
    if (username === null){
        alert("You must be logged in to leave a review!")
    } else {
    const payload = {
      ID: restID,
      FoodID: props.FoodID,
      reviewData: {
        Username: username,
        UserRating: userRated,
        Description: userReview.current.value,
      },
    };
    fetch("/newReview", {
      method: "post",
      body: JSON.stringify(payload),
      headers: {
        "content-Type": "application/json",
      },
    }).then((res) => console.log("new Review Response", res));
   } };

  return (
    <div class="card bg-gray-100 border rounded-md shadow-xl mx-2 md:mx-0 mb-2 mt-2 md:w-full  md:card-side">
      <div class="flex flex-row">
        {/* <div class="flex justify-center py-1 w-2/5">
       <img
         src={props.props.image_url}
           class="restaurant_icon w-4/5 md:w-5/5 md:w-5/6 p-1 pt-2 mb-6 md:mb-0"        
           alt="restaurant"
         />
       </div> */}
        <div class="card-body w-3/5 text-xs text-left sm:text-sm lg:text-lg">
          <h2 class="card-title pt-2 font-bold">Item Name: {props.FoodName}</h2>
          <hr></hr>
          <h3>Stars: {props.Rating}</h3>
          <div class="flex justify-end">
            <button
              onClick={toggleReviews}
              id={props.FoodID}
              class="bg-blue-500 text-white m-2  px-10 border border-blue-700 rounded"
            >
              Read Reviews!
            </button>
          </div>
        </div>
        <div hidden={showReviews}>
          {props.Reviews.map((review) => {
            //NEEDS FORMATTING <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<,
            return (
              <>
                <div> {review.Username}</div>
                <div> {review.Date}</div>
                <div> {review.UserRating}/5 Stars</div>
                <div> {review.Description}</div>
              </>
            );
          })}
        </div>
        <button onClick={toggleForm}>Leave a Review!</button>
        <form onSubmit={newReview&&toggleForm} hidden={showForm}>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={18}
            activeColor="#ffd700"
          />
          <input ref={userReview} placeholder="Write a review..."></input>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ReviewCard;
