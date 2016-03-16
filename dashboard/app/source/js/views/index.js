var angular = require('angular');

var templateDirectory = '../../../build/templates';

console.log('directory: ', __filename);

//console.log(require('path').dirname(process.module.filename));

require(templateDirectory + '/login');
require(templateDirectory + '/register');