import knex from 'bookshelf'

describe('getAvailabilities', () => {
  beforeEach(() => knex('users').truncate())

  describe('simple case', () => {
    // beforeEach(async () => {
    //   await knex('events').insert([
    //     {
    //       kind: 'opening',
    //       starts_at: new Date('2014-08-04 09:30'),
    //       ends_at: new Date('2014-08-04 12:30'),
    //       weekly_recurring: true,
    //     },
    //     {
    //       kind: 'appointment',
    //       starts_at: new Date('2014-08-11 10:30'),
    //       ends_at: new Date('2014-08-11 11:30'),
    //     },
    //   ])
    // })

    // it('should work', async () => {
      
    // })

  })

})
