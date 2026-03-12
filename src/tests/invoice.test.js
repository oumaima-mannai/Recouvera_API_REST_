const request = require('supertest');
const app = require('../../app');

describe('Invoices API', () => {
    it('should return 401 if accessing invoices without token', async () => {
        const res = await request(app).get('/api/invoices');
        expect(res.statusCode).toEqual(401);
    });
});
