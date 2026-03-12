const request = require('supertest');
const app = require('../../app');

describe('Clients API', () => {
    it('should return 401 if accessing clients without token', async () => {
        const res = await request(app).get('/api/clients');
        expect(res.statusCode).toEqual(401);
    });
});
