const request = require('supertest');
const app = require('../../app'); // App without DB connection
const mongoose = require('mongoose');

describe('Auth API', () => {
    it('should return 400 if registering with missing fields', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'test@test.com',
            });
        expect(res.statusCode).toEqual(400);
    });

    it('should return 400 if login with missing fields', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@test.com',
            });
        expect(res.statusCode).toEqual(400);
    });
});
