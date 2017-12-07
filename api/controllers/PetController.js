/**
 * PetController
 *
 * @description :: Server-side logic for managing pets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    /**
     * @api {post} /pet Create pet
    * @apiName CreatePet
    * @apiGroup Pet
    * @apiPermission  authenticated user
    * @apiDescription API to create a new pet.
    *
    * @apiParam {String} name Pet name.
    * @apiParam {Number} owner Pet owner ID.
    *
    * @apiSuccess {Object} pet Pet.
    * @apiSuccess {String} pet.name Person name.
    * @apiSuccess {Object} pet.owner Pet owner.
    * @apiSuccess {String} pet.owner.name Pet owner name.
    */	
	create: async function (req, res) {
        const params = req.params.all();
        let pet;
        let person;

        try {
            person = await Person.findOne(params.owner);

            if (!person) {
                return res.apiError(400, { error: 'Invalid owner' });
            }

            pet = await Pet.create({ 
                name: params.name, 
                owner: params.owner 
            });

            pet = await Pet.findOne(pet.id).populate('owner');
        } catch(error) {
            return res.apiError(500, { error });
        }

        return res.apiSuccess({ pet })
    }
};

