// var express = require('express');
// var router = express.Router();
// var burger = require('../models/burger.js');


// // Setup Routes

// // Index Redirect
// router.get('/', function (req, res) {
//     res.redirect('/index');
// });

// // Index Page 
// router.get('/index', function (req, res) {
//     burger.selectAll(function (data) {
//         var hbsObject = {
//             burgers: data
//         };
//         res.render('index', hbsObject);
//     });
// });

// // Create a New Burger
// router.post('/burger/create/:id', function (req, res) {
//     burger.insertOne(req.body.burger_name, function () {
//         res.redirect('/index');
//     });
// });

// // Devour a Burger
// router.post('/burger/eat/:id', function (req, res) {
//     burger.updateOne(req.params.id, function () {
//         res.redirect('/index');
//     });
// });

// // Export routes
// module.exports = router;


//Require express
var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
//GET route to get burgers from database.
router.get("/", function(req, res) {
  burger.selectAll(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

//POST route to create/add a burger.
router.post('/burger/create/:id', function(req, res) {
  burger.create([
    "burger_name", "devoured"
  ], [
    req.body.burger_name, req.body.devoured
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

//PUT route to update burger devoured state.
router.put('/burger/eat/:id', function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

//DELETE route to throw away a burger.
router.delete('/burger/eat/:id', function(req, res) {
  var condition = "id = " + req.params.id;

  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});


// Export routes for server.js to use.
module.exports = router;