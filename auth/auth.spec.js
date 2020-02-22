const server = require('../api/server')
const request = require('supertest')
const db = require('../database/dbConfig')

beforeEach(() => {
    return db.migrate.rollback()
        .then(() => db.migrate.latest())
        .then(() => db.seed.run())
})

describe('Register User', () => {
    it('POST /api/auth/register', async () => {
        const res = await request(server)
            .post('/api/auth/register')
            .send({ username: 'chris', password: 'taco' })
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('token')
        expect(res.body).toMatchObject({message: 'successfully registered as chris'})
        expect(res.type).toBe('application/json')
    })
})

describe('Login User', () => {
    it('POST /api/auth/login', async () => {
        
        const res = await request(server)
            .post('/api/auth/register')
            .send({ username: 'chris2', password: 'taco' })
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('token')
        expect(res.body).toMatchObject({message: 'successfully registered as chris2'})
        expect(res.type).toBe('application/json')
    })
})