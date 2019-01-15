const k = require('knex')
const config = require('../../knexfile.js')
const request = require('supertest')

import App from '../app'

const knex = k(config.staging)

describe('Message Resource', () => {
  beforeAll(async () => {
    await knex('messages').truncate()
    // await knex('channels').truncate()
  })

  afterAll(async () => {
    await knex('messages').truncate()
    // await knex('channels').truncate()
  })

  describe('CRUD', () => {

    it('can CREATE new channel', () => {
      return request(App).post('/api/channel')
        .send({ 'name': 'Channel 1' })
        .expect(200)
        .then((res: any) => {
          expect(res.type).toBe('application/json')
          expect(res.statusCode).toBe(200)
          expect(res.body.name).toBe('Channel 1')
        })
    })

    it('can GET a channel', async () => {
      const id: number = await knex('channels').insert([
        { name: 'Channel 33' }
      ])

      return request(App).get('/api/channel/' + id)
        .expect(200)
        .then((res: any) => {
          expect(res.type).toBe('application/json')
          expect(res.statusCode).toBe(200)
          expect(res.body.name).toBe('Channel 33')
        })
    })

    it('can UPDATE a channel', async (done) => {
      const id: number = await knex('channels').insert([
        { name: 'Channel 33' }
      ])

      request(App)
        .put('/api/channel/' + id)
        .send({ 'name': 'Updated 33' })
        .expect(200)
        .then((res: any) => {
          expect(res.type).toBe('application/json')
          expect(res.statusCode).toBe(200)
          expect(res.body.name).toBe('Updated 33')
          done()
        })
      
    })

    it('can DELETE a channel', async () => {
      const id: number = await knex('channels').insert([
        { name: 'Channel 33' }
      ])

      return request(App)
        .delete('/api/channel/' + id)
        .expect(200)
        .then((res: any) => {
          expect(res.type).toBe('application/json')
          expect(res.statusCode).toBe(200)
        })

    })

    it('can POST to a channel', async () => {
      const id: number = await knex('channels').insert([
        { name: 'Post to' }
      ])

      const user_id: number = await knex('users').insert([
        { username: 'koffi', password: 'pass' }
      ])

      return request(App)
        .post('/api/channel/' + id + '/message')
        .send({ body: 'Posted to channel', user_id: user_id, channel_id: id })
        .expect(200)
        .then((res: any) => {
          expect(res.type).toBe('application/json')
          expect(res.statusCode).toBe(200)
          expect(res.body.body).toBe('Posted to channel')
        })

    })

  })

})
