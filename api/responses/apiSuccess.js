module.exports = function apiSuccess (data = {}) {
    // Get access to `req`, `res`, & `sails`
    const req = this.req;
    const res = this.res;
    const sails = req._sails;

    res.status(200);

    console.log(`
        ${(new Date()).toISOString()} \n
        ${req.ss_uuid} \n 
        Completed ${req.method} "${req.route.path}" with HTTP 200
    `)

    return res.jsonx(data);
};

