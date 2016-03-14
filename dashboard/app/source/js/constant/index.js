'use strict';
var app = require('angular').module('angular-social-media');

// app.config(require('./myconfig.js')

app.constant('viewUrl', function(relativePath) {
    return 'view/' + relativePath + "?v=" + (new Date()).getTime();
});
    