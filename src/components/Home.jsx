import React from "react";
import { NavLink } from "react-router-dom";
import hero from "../images/hero_splash.jpg";
// import food from "../images/p_food.jpg";
import food1 from "../images/p_food_1.jpg";
import food2 from "../images/p_food_3.jpg";
import altHero from "../images/alt_hero.jpg";
import altHero_ from "../images/hero-shrimp.jpg";

const Home = () => {
  return (
    <>
      <div class="flex flex-col md:items-center mx-auto mt-5 md:space-y-0 z-10">
        {/* removed container, px-5 ^^ */}
        <div class="flex flex-col mx-auto md:flex-row">
          <div className="flex items-center">
            <div className="flex space-x-1">
              {/* <input
                type="text"
                className="block w-full px-5 py-1 text-purple-700 bg-white border rounded-lg focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Search..."
              /> */}
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold m-2 py-2 px-4 border-blue-700 rounded">
                <NavLink to="/search">Check What's Good Around Me</NavLink>
              </button>
            </div>
          </div>
          {/* <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold m-2 py-1 px-4 border-blue-700 rounded">
            What's good around me?
          </button> */}
        </div>
        <div class="flex flex-col-reverse justify-center items-center md:py-10 md:flex-row md:justify-evenly">
          {/* <img src={hero} class="hero_img object-cover" alt=""></img> */}
          {/* Splash Image ^ */}
          <div class="flex items-center mt-10 md:mt-0 md:mb-0 lg:mb-20 text-center tracking-tight font-extrabold text-5xl md:p-20 md:ml-8 md:text-5xl md:w-1/2">
            Find the best items at every restaurant.
          </div>
          <div class="mt-5 md:w-1/2">
            <img src={altHero} class="" alt="" />
          </div>
        </div>
        
        <div class="mx-auto">
          {/* <h1 class="text-2xl text-center px-5 font-extrabold tracking-tight py-6  findthe md:text-3xl lg:text-4xl md:text-center">
            Find the best items at every restaurant.
          </h1> */}
          {/* <p className="text-center px-5 text-darkGrey md:text-center md:mb-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque,
            quidem repudiandae et dignissimos, similique voluptatem, maiores
            dolorem eveniet aperiam deserunt qui illum veniam tempora dolorum`
            eos reiciendis odit quos quisquam quas corrupti fuga laudantium.
            Quas.
          </p> */}
        </div>
      </div>
      {/* <div class = 'display flex justify-end -z-10'>
      <div class="bg-red-600 -mt-32 mr-2 w-1/6 h-32 absolute -z-20"></div>
      </div> */}

      {/* blue bar */}
      {/* <div class="bg-blue-600 mt-32 w-full h-32 bluebar absolute -z-50"></div> */}

      {/* <div class="md:mt-8 mx-auto md:flex md:justify-center md:space-x-10"> */}

      {/* Home Page Cards */}
      {/* <div class="relative flex flex-col items-center justify-evenly mt-20 md:mt-20 md:flex-row">
        <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 m-2">
          <NavLink to="#" class="flex justify-center">
            <img
              class="rounded-t-lg p_food h-48 md:h-64 w-full"
              src={hero}
              alt=""
            />
          </NavLink>
          <div class="p-5">
            <NavLink to="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                The 50 Best Restaurants to Eat
              </h5>
            </NavLink>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
            <NavLink
              to="#"
              class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                aria-hidden="true"
                class="ml-2 -mr-1 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </NavLink>
          </div>
        </div>
        <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 m-2">
          <NavLink to="#" class="flex justify-center">
            <img
              class="rounded-t-lg p_food h-48 md:h-64 w-full"
              src={food1}
              alt=""
            />
          </NavLink>
          <div class="p-5">
            <NavLink to="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                The 50 Best Restaurants to Eat
              </h5>
            </NavLink>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
            <NavLink
              to="#"
              class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                aria-hidden="true"
                class="ml-2 -mr-1 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </NavLink>
          </div>
        </div>
        <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 m-2">
          <NavLink to="flex justify-center">
            <img
              class="rounded-t-lg p_food h-48 md:h-64 w-full"
              src={food2}
              alt=""
            />
          </NavLink>
          <div class="p-5">
            <NavLink to="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                The 50 Best Restaurants to Eat
              </h5>
            </NavLink>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
            <NavLink
              to="#"
              class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                aria-hidden="true"
                class="ml-2 -mr-1 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </NavLink>
          </div>
        </div>
      </div> */}
      {/* 
        <div class=" max-w-6xl mx-auto mt-16  md:px-5 md:py-2 md:mb-32 sm:px-6 lg:px-8 bg-teal-500">
            <div class="mt-8 overflow-hidden">
                <div class="grid grid-cols-1 md:grid-cols-2">
                    <div class="p-6 mr-2 dark:bg-gray-800 mt-5 sm:rounded-lg">
                        <h1 class="text-right text-3xl sm:text-5xl text-gray-800 dark:text-white tracking-tight">
                            What's good for breakfast?
                        </h1>
                        <div class = 'text-right'>
                          <p class="text-normal text-lg sm:text-2xl font-medium text-gray-600 dark:text-gray-400 mt-2">
                              Fill in the form to start a conversation
                          </p>
                        </div>
                    </div>
                      <img src = {food2} class= 'food_sub' alt = ''></img>
                </div>
            </div>
        </div> */}
    </>
  );
};

export default Home;
