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

    /**
     * @api {post} /person Create person
    * @apiName CreatePerson
    * @apiGroup Person
    * @apiPermission  authenticated user
    * @apiDescription API to create a new person.
    *
    * @apiParam {String} name Person name.
    *
    * @apiSuccess {Object} person Person.
    * @apiSuccess {String} person.name Person name.
    */
    create(req, res) {
        const name = req.param('name');

        Person.create({ name })
            .then(person => res.apiSuccess({ person }))
            .catch(error => res.apiError(500, { error }))
    },

    /**
     * @api {post} /person/withPets Create person with pets
    * @apiName CreatePersonWithPets
    * @apiGroup Person
    * @apiPermission  authenticated user
    * @apiDescription API to create a new person along with his/her pets.
    *
    * @apiParam {String} name Person name.
    * @apiParam {String[]} pets Array of pet name.
    *
    * @apiSuccess {Object} person Person.
    * @apiSuccess {String} person.name Person name.
    * @apiSuccess {Object[]} pets Array of pet objects.
    * @apiSuccess {String} pets.name Pet name.
    */
    createWithPets(req, res) {
        const params = req.params.all();

        PersonService.validateCreateWithPets(params)
            .then(() => PersonService.createWithPets(params))
            .then(person => res.apiSuccess({ person }))
            .catch(error => res.apiError(500, { error }))
    },

    /**
     * @api {get} /person Get list of persons
    * @apiName ListPerson
    * @apiGroup Person
    * @apiDescription API to get list of persons along with their pets.
    *
    * @apiSuccess {Object[]} persons Array of person.
    * @apiSuccess {String} persons.name Person name.
    * @apiSuccess {Object[]} persons.pets Array of pet objects.
    * @apiSuccess {String} pets.name Pet name.
    */
    index(req, res) {
        Person.find()
            .populate('pets')
            // .where()
            // .sort()
            // .limit()
            .then(persons => res.apiSuccess({ persons }))
            .catch(error => res.apiError(500, { error }))
    },

    /**
     * @api {get} /person View a person and her pets
    * @apiName ViewPerson
    * @apiGroup Person
    * @apiDescription API to view a persons along with his/her pets.
    *
    * @apiSuccess {Object} person Person.
    * @apiSuccess {String} person.name Person name.
    * @apiSuccess {Object[]} person.pets Array of pet objects.
    * @apiSuccess {String} pets.name Pet name.
    */
    show(req, res) {
        Person.findOne(req.param('id'))
            .populate('pets')
            .then(person => res.apiSuccess({ person }))
            .catch(error => res.apiError(500, { error }))
    }
};

