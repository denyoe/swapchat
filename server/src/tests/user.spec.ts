const k = require('knex')
const config = require('../../knexfile.js')
const request = require('supertest')

import App from '../app'

const knex = k(config.staging)

describe('User Resource', () => {
  // admin : password
  let token: any

  beforeAll(async (done) => {
    knex('users')
    .where('id', 999)
    .then((rows: any) => {
      if (rows.length === 0) {
        return knex('users').insert([
          { id: 999, username: 'admin', password: '$2a$10$RGWd9twc/BQZArd9aSdpRelkIGq3EQhAlua2.DIMG.6iaRmtPBP4C' }
        ]) 
      }
    })

    request(App)
        .post('/api/login')
        .send({
          username: 'admin', password: 'password'
        })
        .end((err: any, response: any) => {
          let tmp = response.body.token
          if( tmp ) {
            token = tmp.split(' ')[1]
          }
          done()
        })
    
  })

  afterAll(async () => {
    // await knex.raw('TRUNCATE TABLE channels users')
    await knex('users').where('id', 999).del()
  })

  describe('CRUD', () => {

    it('It should require authorization', () => {
      return request(App)
              .get('/api/user/999')
              .then((res: any) => {
                expect(res.statusCode).toBe(401)
              })
    })

    it('return 404', () => {
      return request(App).get('/undefined')
              .expect(404)
              .then((res: any) => {
                expect(res.statusCode).toBe(404)
              })
    })

    it('can CREATE new user', () => {
      return request(App).post('/api/user')
        .set('Authorization', `Bearer ${token}`)
        .send({ 'username': 'marcek', 'password': 'markword' })
        .then(async (res: any) => {
          expect(res.type).toBe('application/json')
          expect(res.statusCode).toBe(201)
          expect(res.body.username).toBe('marcek')

          await knex('users').where('id', res.body.id).del()
        })
    })

    it('can GET a user', async () => {
      const id: number = await knex('users').insert([
        { username: 'koffi', password: 'pass' }
      ])

      return request(App).get('/api/user/' + id)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then(async (res: any) => {
          expect(res.type).toBe('application/json')
          expect(res.statusCode).toBe(200)
          expect(res.body.username).toBe('koffi')

          await knex('users').where('id', id).del()
        })
    })

    it('can UPDATE a user', async (done) => {
      const user: number = await knex('users').insert([
        { username: 'sam', password: 'samwise' }
      ])

      request(App)
        .put('/api/user/' + user)
        .set('Authorization', `Bearer ${token}`)
        .send({ 'username': 'sammy' })
        .expect(200)
        .then(async (res: any) => {
          expect(res.type).toBe('application/json')
          expect(res.statusCode).toBe(200)
          expect(res.body.username).toBe('sammy')

          await knex('users').where('id', user).del()
          done()
        })
      
    })

    it('can DELETE a user', async () => {
      const user: number = await knex('users').insert([
        { username: 'sam', password: 'samwise' }
      ])

      return request(App)
        .delete('/api/user/' + user)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((res: any) => {
          expect(res.type).toBe('application/json')
          expect(res.statusCode).toBe(200)
        })

    })

  })

})
