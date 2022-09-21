import React, { Fragment, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { SelectUsername } from "../redux/loginSlice";
import ReactStars from "react-rating-stars-component";
import shrimp from "../images/hero-shrimp.jpg";
import { Dialog, Transition } from "@headlessui/react";
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const ReviewCard = ({ props, restID }) => {
  const [showReviews, setShowReviews] = useState(true);
  const [showForm, setShowForm] = useState(true);
  const [userRated, setUserRated] = useState(0);
  const [foodReviews, setFoodReviews] = useState(props.Reviews)
  const userReview = useRef(null);
  const username = useSelector(SelectUsername);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const ratingChanged = (newRating) => {
    setUserRated(newRating);
  };

  // NEW REVIEW
  const newReview = () => {
    console.log("HelloFront")
    if (username === null) {
      alert("You must be logged in to leave a review!");
    } else {
      const payload = {
        ID: restID,
        FoodID: props.FoodID,
        reviewData: {
          Username: username,
          UserRating: userRated,
          Description: userReview.current.value,
          Date: new Date()
        },
      };
      console.log(payload);
      fetch("/newReview", {
        method: "post",
        body: JSON.stringify(payload),
        headers: {
          "content-Type": "application/json",
        },
      }).then((res) => console.log("new Review Response", res));
      userReview.current.value="";
    setUserRated(0)
    setFoodReviews([...foodReviews, payload.reviewData])
    }
  };

  return (
    <div className="card bg-gray-100 border rounded-md shadow-xl mx-2 md:mx-0 mb-2 mt-2 p-2 min-h-48 md:card-side ">
      <div className="flex flex-col">
        {/* <div className="flex justify-center py-1 w-2/5">
       <img
         src={props.props.image_url}
           className="restaurant_icon w-4/5 md:w-5/5 md:w-5/6 p-1 pt-2 mb-6 md:mb-0"        
           alt="restaurant"
         />
       </div> */}
        <div className="text-xs text-center sm:text-sm lg:text-lg">
          <h2 className="card-title pt-2 font-bold text-center">
            {props.FoodName}!
          </h2>
          <hr></hr>
          <div className="flex flex-col items-center">
            <img className="h-32" src={shrimp} alt=""></img>
          </div>
          <h3>Stars: {props.Rating}</h3>
          <div className="flex flex-col">
            <button
              onClick={() => setOpen(true)}
              id={props.FoodID}
              className="bg-blue-500 text-white m-2  px-10 border border-blue-700 rounded"
            >
              Read Reviews!
            </button>
            {/* modal */}

            <Transition.Root show={open} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-10"
                initialFocus={cancelButtonRef}
                onClose={setOpen}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      enterTo="opacity-100 translate-y-0 sm:scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                      leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                      <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                          <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                              <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900 text-center"
                              >
                                Reviews
                              </Dialog.Title>
                              <div className="mt-2">
                                {foodReviews.map((review) => {
                                  return (
                                    <>
                                      <div className="flex flex-col p-5">
                                        <div> {review.Username}</div>
                                        <div> {review.Date.slice(0, 10)}</div>
                                        <div> {review.UserRating}/5 Stars</div>
                                        <div> {review.Description}</div>
                                      </div>
                                    </>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                          <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => setOpen(false)}
                            ref={cancelButtonRef}
                          >
                            Cancel
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition.Root>

            {/* modal */}
          </div>
        </div>
        <button onClick={toggleForm} disabled={(username==null)}>{(username==null)&&"Log in to leave a Review"}{(username!=null)&&"Leave a Review!"}</button>
        <div hidden={showForm}>
          <div className="flex justify-center p-2">
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={18}
              activeColor="#ffd700"
            />
          </div>
          <input ref={userReview} placeholder="Write a review..."></input>
          <button
            className="bg-green-500 text-white text-xs py-2 px-3 rounded"
            onClick={newReview&&toggleForm}
            disabled={userRated==0}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
