const k = require('knex')
const config = require('../../knexfile.js')
const request = require('supertest')

import App from '../app'

const knex = k(config.staging)
// const knex = k(config.testing)

describe('Message Resource', () => {
  // admin : password
  let token: any

  beforeAll(async (done) => {
    
    knex('users')
      .where('id', 888)
      .then((rows: any) => {
        if (rows.length === 0) {
          return knex('users').insert([
            { id: 888, username: 'admin', password: '$2a$10$RGWd9twc/BQZArd9aSdpRelkIGq3EQhAlua2.DIMG.6iaRmtPBP4C' }
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
        if (tmp) {
          token = tmp.split(' ')[1]
        }
        done()
      })
  })

  afterAll(async () => {
    // await knex('messages').truncate()
    await knex('users').where('id', 888).del()
  })

  describe('CRUD', () => {

    it('can CREATE new channel', () => {
      return request(App)
            .post('/api/channel')
            .set('Authorization', `Bearer ${token}`)
            .send({ 'name': 'Channel 1' })
            .then(async (res: any) => {
              expect(res.type).toBe('application/json')
              expect(res.statusCode).toBe(201)
              expect(res.body.name).toBe('Channel 1')
              await knex('channels').where('id', res.body.id).del()
            })
    })

    it('can GET a channel', async () => {
      const id: number = await knex('channels').insert([
        { name: 'Channel 33', user_id: 888 }
      ])

      return request(App).get('/api/channel/' + id)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then(async (res: any) => {
          expect(res.type).toBe('application/json')
          expect(res.statusCode).toBe(200)
          expect(res.body.name).toBe('Channel 33')
          await knex('channels').where('id', res.body.id).del()
        })
    })

    it('can UPDATE a channel', async (done) => {
      const id: number = await knex('channels').insert([
        { name: 'Post to', user_id: 888 }
      ])

      request(App)
        .put('/api/channel/' + id)
        .set('Authorization', `Bearer ${token}`)
        .send({ 'name': 'Updated 33' })
        .expect(200)
        .then(async (res: any) => {
          expect(res.type).toBe('application/json')
          expect(res.statusCode).toBe(200)
          expect(res.body.name).toBe('Updated 33')
          await knex('channels').where('id', res.body.id).del()
          done()
        })
      
    })

    it('can DELETE a channel', async () => {
      const id: number = await knex('channels').insert([
        { name: 'Post to', user_id: 888 }
      ])

      return request(App)
        .delete('/api/channel/' + id)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((res: any) => {
          expect(res.type).toBe('application/json')
          expect(res.statusCode).toBe(200)
        })

    })

    it('can POST to a channel', async () => {
      const id: number = await knex('channels').insert([
        { name: 'Post to', user_id: 888 }
      ])

      return request(App)
        .post('/api/channel/' + id)
        .set('Authorization', `Bearer ${token}`)
        .send({ body: 'Posted to channel'})
        .then(async (res: any) => {
          expect(res.type).toBe('application/json')
          expect(res.statusCode).toBe(201)
          expect(res.body.body).toBe('Posted to channel')
          expect(res.body.user_id).toBe(888) // logged in user

          await knex('messages').where('id', res.body.id).del()
          await knex('channels').where('id', id).del()
        })

    })

  })

})
