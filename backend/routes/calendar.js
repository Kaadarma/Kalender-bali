import { Router } from "express"
import { generateMonthGrid } from "../utils/calendar.js"

const router = Router()

router.get("/", (req, res) => {
  const now = new Date()
  const month = parseInt(req.query.month) ?? now.getMonth()
  const year = parseInt(req.query.year) ?? now.getFullYear()
  res.json(generateMonthGrid(month, year))
})

export default router
