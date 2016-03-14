module.exports = {
    local: {
        secret: 'llovescotchyscotch',
        database : "mongodb://"+process.env.IP+":"+27017+"/test",
        ApiBase: '/api/v1.0a'
    }
};