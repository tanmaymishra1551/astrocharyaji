// modules/booking/controllers/bookingController.js
import * as bookingService from "../services/bookingService.js"

export const createBooking = async (req, res) => {
    try {
        const { userId, astrologerId, timeSlot } = req.body
        const booking = await bookingService.createBooking({
            userId,
            astrologerId,
            timeSlot,
        })
        res.status(201).json({ booking })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const updateBookingStatus = async (req, res) => {
    try {
        const { bookingId } = req.params
        const { bookingStatus, paymentStatus } = req.body
        const updatedBooking = await bookingService.updateBookingStatus(
            bookingId,
            { bookingStatus, paymentStatus }
        )
        res.status(200).json({ booking: updatedBooking })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
