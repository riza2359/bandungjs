/**
 * PersonController
 *
 * @description :: Server-side logic for managing people
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	test(req, res) {
        res.json({ status: 'ok' });
    },

    create(req, res) {
        const name = req.param('name');

        Person.create({ name })
            .then(person => res.apiSuccess({ person }))
            .catch(error => res.apiError(500, { error }))
    },

    createWithPets(req, res) {
        const params = req.params.all();

        PersonService.validateCreateWithPets(params)
            .then(() => PersonService.createWithPets(params))
            .then(person => res.apiSuccess({ person }))
            .catch(error => res.apiError(500, { error }))
    },

    index(req, res) {
        Person.find()
            .populate('pets')
            // .where()
            // .sort()
            // .limit()
            .then(persons => res.apiSuccess({ persons }))
            .catch(error => res.apiError(500, { error }))
    },

    show(req, res) {
        Person.findOne(req.param('id'))
            .populate('pets')
            .then(person => res.apiSuccess({ person }))
            .catch(error => res.apiError(500, { error }))
    }
};

