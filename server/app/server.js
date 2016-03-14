var restify     = require('restify');
var mongoose    = require('mongoose');
var config      = require('./config');
var morgan      = require('morgan');

global.env        = (process.env.NODE_ENV || "local");

var server = module.exports = restify.createServer({
    name: 'SocialMediaServer'
});

mongoose.connect(config[global.env].database); // connect to database

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(morgan('dev'));

/**
 *  Sign off opts header with access control headers
 */
server.opts(/.*/, function (req,res,next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Method"));
  res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));
  
  res.send(200);
  return next();
});
  
  
// Adding headers to allow cross domain requests
// reference: http://coderxgamer.com/restify-and-cors-support/
server.pre(restify.CORS({origins: ['*']})); 
server.use(restify.fullResponse());

server.listen(process.env.PORT, process.env.IP);

require('./routes')(server);

console.log("server listening on " + process.env.PORT);
