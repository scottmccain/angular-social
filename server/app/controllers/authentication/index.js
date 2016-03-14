var jwt     	= require('jwt-simple');
var moment		= require('moment');
var crypto		= require('crypto')
var async		= require('async');
var config  	= require('../../config')[global.env];
var UserModel	= require('../../models/user');
var Utils		= require('../../utils');

exports.register = function(req, res) {
	
	var username = Utils.sanitize(req.params.username);
	var password = Utils.sanitize(req.params.password);
	var	firstname = Utils.sanitize(req.params.firstname);
	var lastname = Utils.sanitize(req.params.lastname);

	async.waterfall([
		function(callback) {
			console.log('fetching user');
	
			UserModel.findOne({username: username}, callback);
		},
		function(result, callback) {
			console.log('got result from user fetch');
			console.log('result: ', result);
			
			if(!result) {
				var passwordHash = crypto
					.createHash("md5")
					.update(password)
					.digest('hex');
					
				var user = new UserModel({
					username: username,
					password: passwordHash,
					firstname: firstname,
					lastname: lastname
				});
				
				user.save(callback);
			} 
			
			callback();
		}
	], function (err, result) {
		
		if(err) return res.send(500, err);
		
		if(!result) {
			// TODO: return meaningful response of duplicate record
			return res.send(200, {result: "duplicate"});
		}
		
		// TODO: set up authentication email response
		// user will have to click link on email which goes to
		// endpoint /auth/validate which includes time sensitive token
		// in request string (it's a get)
		return res.send(200, {result: "success", user: {id: result._id}});
	});
			
	
/*
	UserModel.findOne({username: req.params.username}, function(err, user) {
		if(err) return res.send(500, {result: "error", error: err});
		
		if(user) return res.send(200, {result: "duplicate", message: "username already exists"});
		
		
	})
	var user = new UserModel({
		username: req.params.username,
		password: passwordHash,
		firstname: req.params.firstname,
		lastname: req.params.lastname
	});
	
	user.save(function(err) {
		if(err) {
			return res.send(500, {result: "error", error: err});
		}
		
		res.send(200, {result: "success"});
	});
	*/
};

exports.login = function(req, res) {
	
	var username = req.params.username;
	var password = req.params.password;
	
	var passwordHash = crypto
		.createHash("md5")
		.update(password)
		.digest('hex');
	 
	
	console.log('hash: ', passwordHash);
	
// find the user
	UserModel.findOne({
		username: username,
		password: passwordHash
	}, function(err, user) {

    	if (err) return res.send(500, err);

    	if (!user) {
      		res.send(401, { success: false, message: 'Authentication failed. User not found.' });
    	} else if (user) {

			console.log('calculating token');

			var expires = moment().add(8, 'hours').valueOf();
			var token = jwt.encode({
				id: user._id, exp: expires, firstname: user.firstname, lastname: user.lastname, username: user.username
			}, 'ilovescotchyscotch');
	    	
			// return the information including token as JSON
			res.send(200, {
	  			success: true,
	  			message: 'Enjoy your token!',
	  			token: token
			});
    	}

  	});
};