const uuidv4 = require('uuid/v4');
const util = require('util');

module.exports = (req, res, next) => {    
    req.ss_uuid = uuidv4(); // set request unique ID

    console.log(`
        ${(new Date()).toISOString()} \n
        ${req.ss_uuid}  \n
        Started ${req.method} "${req.route.path}" for ${req.ip} \n
        ${util.inspect(req.params.all()).replace(/\n/g, '')}
    `);

    return next();
}