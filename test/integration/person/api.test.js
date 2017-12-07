const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;

chai.use(chaiHttp);

describe('Person API', () => {
    describe('Create person', () => {
        it('should reject request without access token', (done) => {
            chai.request(API_URL)
                .post('/person')
                .end((err, res) => {
                    assert(res.status, 401);
                    assert(res.body.error, 'Invalid token');
            
                    done()
                })
        });

        it('should not create person without name', (done) => {
            chai.request(API_URL)
                .post('/person')
                .set('Authorization', `Bearer 1234`)
                .end((err, res) => {
                    assert(res.status, 500);
                    assert(res.body.error.error, 'E_VALIDATION');
            
                    done()
                })
        });

        it('should create a person', (done) => {
            chai.request(API_URL)
                .post('/person')
                .set('Authorization', `Bearer 1234`)
                .send({ name: 'New person' })
                .end((err, res) => {
                    assert(res.status, 200);
                    assert(res.body.person.name, 'New person');
            
                    done()
                })
        });
    });

    describe('Create person with pets', () => {
        it('should reject request without access token', (done) => {
            chai.request(API_URL)
                .post('/person/withPets')
                .end((err, res) => {
                    assert(res.status, 401);
                    assert(res.body.error, 'Invalid token');
            
                    done()
                })
        });
        
        it('should not create person without name', (done) => {
            chai.request(API_URL)
                .post('/person/withPets')
                .set('Authorization', `Bearer 1234`)
                .end((err, res) => {
                    assert(res.status, 400);
                    assert(res.body.error.msg, 'Name is required');
            
                    done()
                })
        });
        
        it('should not create person without pets', (done) => {
            chai.request(API_URL)
                .post('/person/withPets')
                .set('Authorization', `Bearer 1234`)
                .send({ name: 'New person' })
                .end((err, res) => {
                    assert(res.status, 400);
                    assert(res.body.error.msg, 'Pets are required');
            
                    done()
                })
        });
        
        it('should not create person without array of pets', (done) => {
            chai.request(API_URL)
                .post('/person/withPets')
                .set('Authorization', `Bearer 1234`)
                .send({ name: 'New person', pets: 'snake' })
                .end((err, res) => {
                    assert(res.status, 400);
                    assert(res.body.error.msg, 'Pets must be array');
            
                    done()
                })
        });

        it('should create a person with pets', (done) => {
            chai.request(API_URL)
                .post('/person/withPets')
                .set('Authorization', `Bearer 1234`)
                .send({ name: 'New person', pets: ['snake', 'fish'] })
                .end((err, res) => {
                    assert(res.status, 200);
                    assert(res.body.person.name, 'New person');
                    assert.isArray(res.body.person.pets);
                    assert.equal(res.body.person.pets.length, 2);
            
                    done()
                })
        });
    });

    describe('get list of persons', (done) => {
        it('should return list of persons', (done) => {
            chai.request(API_URL)
                .get('/person')
                .end((err, res) => {
                    assert(res.status, 200);
                    assert.isArray(res.body.persons);
                    assert.equal(res.body.persons.length, 2);            
                    assert.isArray(res.body.persons[0].pets);
                    assert.isArray(res.body.persons[1].pets);

                    done()
                })
        });
    });
    
    describe('view a person', () => {
        it('should return data of a person', (done) => {
            Person.find()
                .then((persons) => {
                    chai.request(API_URL)
                        .get(`/person/${persons[0].id}`)
                        .end((err, res) => {
                            assert(res.status, 200);
                            assert.equal(res.body.person.name, 'New person');            
                            assert.isArray(res.body.person.pets);

                            done()
                        })
                })       
        });
    });

    after((done) => {
        Promise.all([
            Person.destroy(),
            Pet.destroy()
        ])
            .then(done.bind(null, null))
            .catch(done);
    });
});