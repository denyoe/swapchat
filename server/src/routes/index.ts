/* Home */
import express from 'express'
const router = express.Router()

router.get('/', (req: any , res: any, next: any) => {
  res.json({ title: 'Index' })
})

export default router
