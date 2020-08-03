var express = require('express');
var router = express.Router();

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
  res.render('home', { title: 'Meals Weekly' });
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
  var breakfast = req.body.breakfast;
  var lunch = req.body.lunch;
  var dinner = req.body.dinner;

  // Set our collection
  var collection = db.get('mealcollection');

  // Submit to the DB
  collection.insert({
      "breakfast" : breakfast,
      "lunch" : lunch,
      "dinner" : dinner
  }, function (err, doc) {
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

module.exports = router;
