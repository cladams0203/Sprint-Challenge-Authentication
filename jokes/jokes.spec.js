const server = require('../api/server')
const request = require('supertest')
const db = require('../database/dbConfig')

beforeEach(() => {
    return db.migrate.rollback()
        .then(() => db.migrate.latest())
        .then(() => db.seed.run())
})

describe('Get Jokes', () => {
    it('GET /api/jokes', async () => {
        const register = await request(server)
            .post('/api/auth/register')
            .send({ username: 'chris', password: 'taco' })
        const res = await request(server)
            .get('/api/jokes')
            .set('authorization', register.body.token)
        expect(res.status).toBe(200)
        expect(res.body[0]).toHaveProperty('joke')
        expect(res.body[0]).toHaveProperty('id')
        expect(res.body).toHaveLength(20)
        expect(res.type).toBe('application/json')
    })
})