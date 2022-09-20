// import { setCookies } from "cookies-next";
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const passportGoogle = require("passport-google-oidc").Strategy;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const User = require("./models/user");
const Restaurant = require("./models/restaurant");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5500;

require("dotenv").config();

const connection_string = process.env.MONGO_KEY;
const key = process.env.API_KEY;
const axios = require('axios');
const { FaEquals } = require('react-icons/fa');
const { Autocomplete } = require('@react-google-maps/api');
const router = require("express").Router();

const isLoggedIn = (req,res, next) => {
  req.user ? next() : res.sendStatus(401);
}

mongoose.connect(
  connection_string,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("mongoose connected");
  }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passport-config")(passport);

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No matching credentials");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});

app.get('/google', passport.authenticate('google', {
  scope: ['profile','email'],
}))

app.get('/google/callback',
  passport.authenticate('google', { 
    successRedirect: '/login/success',
    failureRedirect: '/login/failed'}), 
);

app.get("/login/success", isLoggedIn, (req, res) => {
  res.status(200);
  res.redirect('http://localhost:3000/');
  // if (req.user) 
  //   res.status(200).json({
  //     success: true,
  //     message: "user authenticated",
  //     user: req.user,
  //   });
  // }
});

app.get('/login/failed', (req,res) => {
  res.status(401).json({
    message: 'failure',
  }) 
})

app.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashPw = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hashPw,
      });
      await newUser.save();
      res.send("User Created");
    }
  })
});

app.post("/getLocation", (req, res) => {
  const lat = req.body.lat;
  const long = req.body.long;
  const url = `https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=${lat}&longitude=${long}`;
  const config = { headers: { Authorization: `Bearer ${key}` } };
  console.log("Server Side lat: " + lat + "long: " + long);
  axios
    .get(url, config)
    .then((response) => res.send(response.data.businesses))
    .catch((err) => console.log(err));
});

app.post("/getLocationWithAddress", (req, res) => {
  const address = req.body.address;
  const url = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${address}`;
  const config = { headers: { Authorization: `Bearer ${key}` } };
  axios
    .get(url, config)
    .then((response) => res.send(response.data.businesses))
    .catch((err) => console.log(err));
});

app.get("/user", (req, res) => {
  res.send(req.user);
});

app.post("/user", (req, res) => {
  req.logout(function (err) {
    if (err) throw err;
  });
});

// Checks DB if restaurant exists by ID, if so return restaurant data. Not sure if this works. It was based on the User.findOne()
app.post("/checkDB", (req, res) => {
  Restaurant.find({ ID: req.body.id }, async (err, doc) => {
    if (err) throw err;
    else {
      res.json(doc);
    }
  });
});

//Test path, checks to see if we have any restaurant data
app.get("/check", (req, res) =>
  Restaurant.find({})
    .then((data) => {
      console.log("Data ", data);
      res.json(data);
    })
    .catch((error) => {
      console.log("error ", error);
    })
);

// Adds New Restaurant
app.post("/newRestaurant", (req, res) => {
  //console.log(req.body)
  const newRestaurant = new Restaurant(req.body);
  newRestaurant.save((error) => {
    if (error) {
      res.status(500).json({msg: "Internal Server Error??"})
    } else {
      res.json({
        msg: "Data saved",
      });
    }
  });
});


//Add New Food Item
app.post("/newFoodItem", (req, res) => {
  // console.log(req.body)
  const { ID, foodData } = req.body;
  Restaurant.updateOne({ ID: ID}, {$push: {
    MenuItems: {
      FoodID: foodData.FoodID,
      FoodName: foodData.FoodName,
      Rating: 0,
      Reviews:[],
    }
  }}, {upsert:true}).then(
    res.json({msg: "soemthing happened"})
  );
});

//Add New Review
app.post("/newReview", (req, res) => {
  console.log(req.body)
  const { ID, FoodID, reviewData } = req.body;
  //Adds review to Restaurant db
  Restaurant.updateOne({ID:ID}, {$push: { "MenuItems.$[elem].Reviews": { 
      Username: reviewData.Username,
      UserRating: reviewData.UserRating,
      Description: reviewData.Description,
      Date: Date.now(),
  }}},
  {
    arrayFilters: [{"elem.FoodID": FoodID}], multi:false
  }
  )
.then(
    res.json({msg: "soemthing happened"})
  );

  //Adds review to user db
  User.updateOne({username: reviewData.username},{$push: {Reviews: {
    UserRating: reviewData.UserRating,
    Description: reviewData.Description,
    Date: Date.now(),}
  }})

  // NEED TO UPDATE AVERAGE USER RATING FOR FOOD <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<,
});

app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});
