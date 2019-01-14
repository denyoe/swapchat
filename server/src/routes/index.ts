/* GET home page. */
import express from 'express'
const router = express.Router()

router.get('/', function(req: any , res: any, next: any) {
  res.json({ title: 'Index' })
})

module.exports = router
