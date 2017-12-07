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
            .then(person => res.json({ person }))
            .catch(error => res.json(500, { error }))
    },

    createWithPets(req, res) {
        const params = req.params.all();

        PersonService.validateCreateWithPets(params)
            .then(() => PersonService.createWithPets(params))
            .then(person => res.json({ person }))
            .catch(error => res.json(500, { error }))
    },

    index(req, res) {
        Person.find()
            .populate('pets')
            // .where()
            // .sort()
            // .limit()
            .then(persons => res.json({ persons }))
            .catch(error => res.json(500, { error }))
    },

    show(req, res) {
        Person.findOne(req.param('id'))
            .populate('pets')
            .then(person => res.json({ person }))
            .catch(error => res.json(500, { error }))
    }
};

