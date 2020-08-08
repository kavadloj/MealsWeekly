var express = require('express');
var router = express.Router();
var globalUser = "";
var globalWeek = "";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
  res.render('helloworld', { title: 'Hello, World!' });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({},{},function(e,docs){
      res.render('userlist', {
          "userlist" : docs
      });
  });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
  res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var userName = req.body.username;
  var userEmail = req.body.useremail;

  // Set our collection
  var collection = db.get('usercollection');

  // Submit to the DB
  collection.insert({
      "username" : userName,
      "email" : userEmail
  }, function (err, doc) {
      if (err) {
          // If it failed, return error
          res.send("There was a problem adding the information to the database.");
      }
      else {
          // And forward to success page
          res.redirect("userlist");
      }
  });

});






/* GET Home page. */
router.get('/home', function(req, res) {
  var db = req.db;
  var mealcollection = db.get('mealcollection');
  mealcollection.find({"username" : globalUser, "week" : globalWeek},{},function(e,docs){
      res.render('home', {
          title: 'Meals Weekly',
          "meallist" : docs
      });
  });
});

/* GET List page. */
router.get('/list', function(req, res) {
  res.render('list', { title: 'Meals Weekly' });
});

/* GET Add Meal page. */
router.get('/addmeal', function(req, res) {
  res.render('addmeal', { title: 'Meals Weekly' });
});

/* POST to Add Meal service */
router.post('/sendmeals', function(req, res) {

  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var week = req.body.week;
  var day = req.body.day;
  var breakfast = req.body.breakfast;
  var lunch = req.body.lunch;
  var dinner = req.body.dinner;

  // Set our collection
  var collection = db.get('mealcollection');

  // Submit to the DB
  collection.update(
    {"day" : day, "week" : week, "username" : globalUser},
    {$set:{
      "breakfast" : breakfast,
      "lunch" : lunch,
      "dinner" : dinner,
  }}, function (err, doc) {
      if (err) {
          // If it failed, return error
          res.send("There was a problem adding the information to the database.");
      }
      else {
          // And forward to success page
          res.redirect("home");
      }
  });

});





/* GET Add Login page. */
router.get('/login', function(req, res) {
  res.render('login', { title: 'Meals Weekly' });
});

/* POST to Add Account service */
router.post('/sendaccountdetails', function(req, res) {

  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var username = req.body.username;
  var password = req.body.password;
  globalUser = username;
  globalWeek = "Week 1";

  var usercollection = db.get('usercollection');
  var mealcollection = db.get('mealcollection');

  // Submit to the DB
  usercollection.insert({
      "username" : username,
      "password" : password
  }, function (err, doc) {
      if (err) {
          // If it failed, return error
          res.send("There was a problem adding the information to the database.");
      }
      else {
          // And forward to success page
          mealcollection.insert([
            {
              "breakfast" : "",
              "lunch" : "",
              "dinner" : "",
              "day" : "Monday",
              "week" : globalWeek,
              "username" : username
            },
            {
              "breakfast" : "",
              "lunch" : "",
              "dinner" : "",
              "day" : "Tuesday",
              "week" : globalWeek,
              "username" : username
            },
            {
              "breakfast" : "",
              "lunch" : "",
              "dinner" : "",
              "day" : "Wednesday",
              "week" : globalWeek,
              "username" : username
            },
            {
              "breakfast" : "",
              "lunch" : "",
              "dinner" : "",
              "day" : "Thursday",
              "week" : globalWeek,
              "username" : username
            },
            {
              "breakfast" : "",
              "lunch" : "",
              "dinner" : "",
              "day" : "Friday",
              "week" : globalWeek,
              "username" : username
            },
            {
              "breakfast" : "",
              "lunch" : "",
              "dinner" : "",
              "day" : "Saturday",
              "week" : globalWeek,
              "username" : username
            },
            {
              "breakfast" : "",
              "lunch" : "",
              "dinner" : "",
              "day" : "Sunday",
              "week" : globalWeek,
              "username" : username
            },
          ], function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // And forward to success page
                res.redirect("home");
            }
        });
      }
  });

});



router.post('/newweek', function(req, res) {

  // Set our internal DB variable
  var db = req.db;

  var newweek = req.body.newweekfield;
  globalWeek = newweek;

  // Set our collection
  var collection = db.get('mealcollection');

  // Submit to the DB
  collection.insert([
    {
      "breakfast" : "",
      "lunch" : "",
      "dinner" : "",
      "day" : "Monday",
      "week" : newweek,
      "username" : globalUser
    },
    {
      "breakfast" : "",
      "lunch" : "",
      "dinner" : "",
      "day" : "Tuesday",
      "week" : newweek,
      "username" : globalUser
    },
    {
      "breakfast" : "",
      "lunch" : "",
      "dinner" : "",
      "day" : "Wednesday",
      "week" : newweek,
      "username" : globalUser
    },
    {
      "breakfast" : "",
      "lunch" : "",
      "dinner" : "",
      "day" : "Thursday",
      "week" : newweek,
      "username" : globalUser
    },
    {
      "breakfast" : "",
      "lunch" : "",
      "dinner" : "",
      "day" : "Friday",
      "week" : newweek,
      "username" : globalUser
    },
    {
      "breakfast" : "",
      "lunch" : "",
      "dinner" : "",
      "day" : "Saturday",
      "week" : newweek,
      "username" : globalUser
    },
    {
      "breakfast" : "",
      "lunch" : "",
      "dinner" : "",
      "day" : "Sunday",
      "week" : newweek,
      "username" : globalUser
    },
  ], function (err, doc) {
      if (err) {
          // If it failed, return error
          res.send("There was a problem adding the information to the database.");
      }
      else {
          // And forward to success page
          res.redirect("home");
      }
  });

});

router.post('/switchweek', function(req, res) {
  var setweek = req.body.week;
  globalWeek = setweek;
  res.redirect("home");
});


module.exports = router;
