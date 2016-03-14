var config              = require('../../config')[global.env];
var namespace           = require('restify-namespace');
var controller          = require('../../controllers/authentication');

module.exports = function(server) {
    
	namespace(server, config.ApiBase, function () {
		server.post('/auth/login', controller.login);
		server.post('/auth/register', controller.register);
	});

};