const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const server = require('../server'); // Adjust the path to your server file
const User = require('../models/User');
const Order = require('../models/Orders');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { expect } = chai;

chai.use(chaiHttp);

describe('Auth Routes', () => {
    describe('POST /createuser', () => {
        it('should return validation errors if input is invalid', (done) => {
            chai.request(server)
                .post('/createuser')
                .send({ email: 'invalidemail', password: '123', name: 'ab' })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('errors');
                    done();
                });
        });

        it('should create a user if input is valid', (done) => {
            sinon.stub(User, 'create').resolves({
                id: '123',
                name: 'lewis njaci',
                email: 'lewisjassy@gmail.com',
                password: 'Testpassword',
                location: 'kenya'
            });

            chai.request(server)
                .post('/createuser')
                .send({ email: 'lewis@example.com', password: '12345', name: 'Jassy', location: 'Nairobi' })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('success', true);
                    expect(res.body).to.have.property('authToken');
                    User.create.restore();
                    done();
                });
        });
    });

    describe('POST /login', () => {
        it('should return validation errors if input is invalid', (done) => {
            chai.request(server)
                .post('/login')
                .send({ email: 'invalidemail', password: '' })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('errors');
                    done();
                });
        });

        it('should return error if user does not exist', (done) => {
            sinon.stub(User, 'findOne').resolves(null);

            chai.request(server)
                .post('/login')
                .send({ email: 'ghost@example.com', password: '12345' })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('error', 'Try Logging in with correct credentials');
                    User.findOne.restore();
                    done();
                });
        });

        it('should return error if password is incorrect', (done) => {
            sinon.stub(User, 'findOne').resolves({
                id: '123',
                email: 'nerd@example.com',
                password: 'Testpassword'
            });
            sinon.stub(bcrypt, 'compare').resolves(false);

            chai.request(server)
                .post('/login')
                .send({ email: 'Test@example.com', password: 'wrongpassword' })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('error', 'Try Logging in with correct credentials');
                    User.findOne.restore();
                    bcrypt.compare.restore();
                    done();
                });
        });

        it('should return auth token if credentials are correct', (done) => {
            sinon.stub(User, 'findOne').resolves({
                id: '123',
                email: 'software@example.com',
                password: 'hashedpassword'
            });
            sinon.stub(bcrypt, 'compare').resolves(true);
            sinon.stub(jwt, 'sign').returns('authtoken');

            chai.request(server)
                .post('/login')
                .send({ email: 'Test@example.com', password: '12345' })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('success', true);
                    expect(res.body).to.have.property('authToken', 'authtoken');
                    User.findOne.restore();
                    bcrypt.compare.restore();
                    jwt.sign.restore();
                    done();
                });
        });
    });

    // Add more tests for other routes as needed
});