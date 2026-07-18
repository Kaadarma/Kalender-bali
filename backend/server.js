import express from "express"
import cors from "cors"
import todayRoute from "./routes/today.js"
import calendarRoute from "./routes/calendar.js"

const app = express()
const PORT = 3001

app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"] }))

app.use("/api/today", todayRoute)
app.use("/api/calendar", calendarRoute)

app.listen(PORT, () => {
  console.log(`Kalabali backend running on http://localhost:${PORT}`)
})
