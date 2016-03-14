module.exports = function(server) {
    
    require('./user')(server);  
    require('./authentication')(server);
    
};