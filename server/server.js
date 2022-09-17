const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const User = require("./models/user");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5500;
require('dotenv').config();
const connection_string = process.env.MONGO_KEY;

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
// app.use(express.urlencoded())
// app.use(express.json());
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



const key = process.env.API_KEY;

const axios = require('axios');

app.post("/getLocation",(req,res)=>{   
  const lat = req.body.lat;
  const long = req.body.long;
  // console.log(req.body)
    const url = `https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=${lat}&longitude=${long}`
    const config = {headers: { "Authorization":`Bearer ${key}` }};
  console.log("Server Side lat: "+ lat + "long: " +long);
  axios.get(url, config).then((response)=>res.send(response.data.businesses)).catch((err)=>console.log(err))
    // res.send({"something":"anything"})
})

app.post("/getLocationWithAddress",(req,res)=>{   
  const address = req.body.address
  console.log(address)
    const url = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${address}`
    const config = {headers: { "Authorization":`Bearer ${key}` }};
  console.log("Address:" , address);
  axios.get(url, config).then((response)=>res.send(response.data.businesses)).catch((err)=>console.log(err))
    // res.send({"something":"anything"})
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