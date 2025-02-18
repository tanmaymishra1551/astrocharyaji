// modules/booking/services/bookingService.js
import pkg from "pg"
const { Pool } = pkg
const pool = new Pool({
    connectionString: process.env.POSTGRES_CONNECTION_STRING,
})

export const checkAvailability = async (astrologerId, timeSlot) => {
    const result = await pool.query(
        "SELECT COUNT(*) FROM bookings WHERE astrologer_id = $1 AND time_slot = $2 AND booking_status = $3",
        [astrologerId, timeSlot, "Confirmed"]
    )
    return result.rows[0].count == 0
}

export const createBooking = async ({ userId, astrologerId, timeSlot }) => {
    const isAvailable = await checkAvailability(astrologerId, timeSlot)
    if (!isAvailable) throw new Error("Time slot not available")

    const result = await pool.query(
        "INSERT INTO bookings (user_id, astrologer_id, time_slot, booking_status, payment_status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [userId, astrologerId, timeSlot, "Pending", "Pending"]
    )
    return result.rows[0]
}

export const updateBookingStatus = async (
    bookingId,
    { bookingStatus, paymentStatus }
) => {
    const result = await pool.query(
        "UPDATE bookings SET booking_status = $1, payment_status = $2, updated_at = NOW() WHERE booking_id = $3 RETURNING *",
        [bookingStatus, paymentStatus, bookingId]
    )
    return result.rows[0]
}
