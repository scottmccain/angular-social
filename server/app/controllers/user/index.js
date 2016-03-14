var config  = require('../../config');
var User 	= require('../../models/user');

exports.findAll = function(req, res) {
	
	console.log('looking for users');
	
	User.find({}, function(err, users) {
		if(err) return res.send(500, err);
		
		res.send(200, users);
	});
};
