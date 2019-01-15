const k = require('knex')
const config = require('../../knexfile.js')
const request = require('supertest')

import App from '../app'

const knex = k(config.staging)

describe('User Resource', () => {
  beforeAll(async () => {
    // await knex('users').truncate()
  })

  afterAll(async () => {
    // await knex.raw('TRUNCATE TABLE channels users')
  })

  describe('CRUD', () => {

    it('return 404', () => {
      return request(App).get('/undefined')
        .expect(404)
        .then((res: any) => {
          expect(res.statusCode).toBe(404)
        })
    })

    it('can CREATE new user', () => {
      return request(App).post('/api/user')
        .send({ 'username': 'marcek', 'password': 'markword' })
        .expect(200)
        .then((res: any) => {
          expect(res.type).toBe('application/json')
          expect(res.statusCode).toBe(200)
          expect(res.body.username).toBe('marcek')
          expect(res.body.password).toBe('markword')
        })
    })

    it('can GET a user', async () => {
      const id: number = await knex('users').insert([
        { username: 'koffi', password: 'pass' }
      ])

      return request(App).get('/api/user/' + id)
        .expect(200)
        .then((res: any) => {
          expect(res.type).toBe('application/json')
          expect(res.statusCode).toBe(200)
          expect(res.body.username).toBe('koffi')
        })
    })

    it('can UPDATE a user', async (done) => {
      const user: number = await knex('users').insert([
        { username: 'sam', password: 'samwise' }
      ])

      request(App)
        .put('/api/user/' + user)
        .send({ 'username': 'sammy' })
        .expect(200)
        .then((res: any) => {
          expect(res.type).toBe('application/json')
          expect(res.statusCode).toBe(200)
          expect(res.body.username).toBe('sammy')
          done()
        })
      
    })

    it('can DELETE a user', async () => {
      const user: number = await knex('users').insert([
        { username: 'sam', password: 'samwise' }
      ])

      return request(App)
        .delete('/api/user/' + user)
        .expect(200)
        .then((res: any) => {
          expect(res.type).toBe('application/json')
          expect(res.statusCode).toBe(200)
        })

    })

  })

})
