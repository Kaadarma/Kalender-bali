import { Router } from "express"
import { getTodayData } from "../utils/calendar.js"

const router = Router()

router.get("/", (req, res) => {
  res.json(getTodayData())
})

export default router
