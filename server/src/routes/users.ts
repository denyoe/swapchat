/* GET users listing. */
import express from 'express'
const router = express.Router()

router.get('/users', function(req: any, res: any, next: any) {
  res.send('respond with a resource')
})

module.exports = router
