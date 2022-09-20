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
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5500;
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
});
});

app.post("/getLocation",(req,res)=>{   
  const lat = req.body.lat;
  const long = req.body.long;
    const url = `https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=${lat}&longitude=${long}`
    const config = {headers: { "Authorization":`Bearer ${key}` }};
  console.log("Server Side lat: "+ lat + "long: " +long);
  axios.get(url, config).then((response)=>res.send(response.data.businesses)).catch((err)=>console.log(err))
})

app.post("/getLocationWithAddress",(req,res)=>{   
  const address = req.body.address
    const url = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${address}`
    const config = {headers: { "Authorization":`Bearer ${key}` }};
  axios.get(url, config).then((response)=>res.send(response.data.businesses)).catch((err)=>console.log(err))
})

app.get("/user", (req, res) => {
  res.send(req.user);
});

app.post("/user", (req,res) => {
  req.logout(function(err) {
    if (err) throw (err);
})
})

app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});