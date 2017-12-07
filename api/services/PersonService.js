module.exports = {
    validateCreateWithPets(params) {
        return new Promise((resolve, reject) => {
            if (!params.name) reject({ msg: 'Name is required', status: 400 })
            if (!params.pets) reject({ msg: 'Pets are required', status: 400 })
            if (!Array.isArray(params.pets)) reject({ msg: 'Pets must be array', status: 400 })

            resolve();
        })
    },

    createWithPets: async function(params) {
        let person;
        let pets;

        person = await Person.create({ name: params.name });
        pets = params.pets.map(pet => ({ name: pet, owner: person.id }));
        pets = await Pet.create(pets);
        person = await Person.findOne(person.id).populate('pets');

        return person;
    }
}