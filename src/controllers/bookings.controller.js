import BookingManager from "../managers/BookingManager.js"

const bookingManager = new BookingManager()

export const getBookings = async (req, res) => {
    const bookings = await bookingManager.getBookings()
    res.status(200).json({
        status: "success",
        payload: bookings
    })
}

export const createBooking = async (req, res) => {
    const data = req.body
    try {
        const newBooking = await bookingManager.createBooking(data)
        res.status(201).json({
            status: "success",
            payload: newBooking
        })
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: `${error}`
        })
    }

}

export const getBookingById = async (req, res) => {
    const { bid } = req.params
    const booking = await bookingManager.getBookingById(bid)
    if (!booking) {
        return res.status(404).json({
            status: "error",
            message: "El booking no existe"
        })
    }

    res.status(200).json({
        status: "success",
        payload: booking
    })
}

export const addServiceToBooking = async (req, res) => {
    const { bid, sid } = req.params;
    try {
        const result = await bookingManager.addServiceToBooking(Number(bid), Number(sid))
        res.status(201).json({
            status: "success",
            payload: result
        })

    } catch (error) {
        res.status(404).json({
            status: "error",
            message: `${error}`
        })
    }
}