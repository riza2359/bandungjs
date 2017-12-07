const util = require('util');

module.exports = function apiError (code, error) {
    // Get access to `req`, `res`, & `sails`
    const req = this.req;
    const res = this.res;
    const sails = req._sails;

    res.status(code);

    console.error(`
        ${(new Date()).toISOString()} \n
        ${req.ss_uuid} \n 
        Got error ${req.method} "${req.route.path}" with HTTP ${code} \n
        ${util.inspect(error)}
    `);

    return res.jsonx(error);
};