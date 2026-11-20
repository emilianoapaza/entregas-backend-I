import express from "express"
import routingDetector from "./middlewares/routing.js";

import servicesRouter from "./routes/services.router.js"
import bookingsRouter from "./routes/bookings.router.js"


// Settings
const app = express()

// Middlewares
app.use(express.json())
app.use(routingDetector)

// Routes
app.use("/api/services", servicesRouter)
app.use("/api/bookings", bookingsRouter)

export default app
