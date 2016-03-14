var mongoose = require('mongoose');
var config = require('./app/config');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var User   = require('./app/models/user'); // get our mongoose model

mongoose.connect(config.local.database); // connect to database

  var nick = new User({ 
    name: 'Nick Cerminara', 
    pw: 'password'
  });

  // save the sample user
  nick.save(function(err) {
    if (err) return console.log('err: ', err);

    console.log('User saved successfully');
    //res.json({ success: true });
  });
  
  