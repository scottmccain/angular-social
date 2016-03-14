var config              = require('../../config')[global.env];
var namespace           = require('restify-namespace');
var controller          = require('../../controllers/user');

module.exports = function(server) {
    
	namespace(server, config.ApiBase, function () {
		server.get('/user', controller.findAll);
	});

};