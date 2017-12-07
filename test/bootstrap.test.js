const Sails = require('sails');

global.API_URL = 'http://localhost:8888'

before('Start sails', (done) => {
    Sails.lift({
        port: 8888,
        environment: 'test'
    }, (err) => {
        if (err) return done(err)

        done(err, sails);
    })
})

after((done) => {
    sails.lower(done)
})
