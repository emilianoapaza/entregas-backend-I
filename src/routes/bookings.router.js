import { Router } from "express"
import BookingManager from "../managers/BookingManager.js"

const bookingManager = new BookingManager()
const router = Router()

router.post("/", async (req, res) => {
    const data = req.body
    try {
        const newBooking = await bookingManager.createBooking(data)
        res.status(201).json({
            status: "success",
            payload: newBooking
        })
    } catch (error) {
        res.status(400).json({
            message: `${error}`
        })
    }

})

router.get("/:bid", async (req, res) => {
    const { bid } = req.params
    const booking = await bookingManager.getBookingById(bid)
    if (!booking) {
        return res.status(404).json({
            message: "El booking no existe"
        })
    }

    res.status(200).json({
        status: "success",
        payload: booking
    })
})

router.post("/:bid/services/:sid", async (req, res) => {
    const { bid, sid } = req.params;
    try {
        const result = await bookingManager.addServiceToBooking(Number(bid), Number(sid))
        res.status(201).json({
            status: "success",
            payload: result
        })

    } catch (error) {
        res.status(404).json({
            message: `${error}`
        })
    }
})

export default router