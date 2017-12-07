const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;

chai.use(chaiHttp);

describe('Pet API', () => {
    before((done) => {
        Person.create({
            name: 'Pet owner',
            id: 1
        }).then(done.bind(null, null));
    })

    describe('Create pet', () => {
        it('should reject request without access token', (done) => {
            chai.request(API_URL)
                .post('/pet')
                .send({ owner: 0 })
                .end((err, res) => {
                    assert(res.status, 401);
                    assert(res.body.error, 'Invalid token');
            
                    done()
                })
        });
        
        it('should not create pet without valid owner', (done) => {
            chai.request(API_URL)
                .post('/pet')
                .set('Authorization', `Bearer 1234`)
                .send({ owner: 0 })
                .end((err, res) => {
                    assert(res.status, 400);
                    assert(res.body.error, 'Invalid owner');
            
                    done()
                })
        });

        it('should not create pet without name', (done) => {
            chai.request(API_URL)
                .post('/pet')
                .set('Authorization', `Bearer 1234`)
                .send({ owner: 1 })
                .end((err, res) => {
                    assert(res.status, 500);
                    assert(res.body.error.error, 'E_VALIDATION');
            
                    done()
                })
        });

        it('should create a pet', (done) => {
            chai.request(API_URL)
                .post('/pet')
                .set('Authorization', `Bearer 1234`)
                .send({ owner: 1, name: 'Dog' })
                .end((err, res) => {
                    assert(res.status, 200);
                    assert(res.body.pet.name, 'Dog');
                    assert(res.body.pet.owner.name, 'Pet owner');
            
                    done()
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