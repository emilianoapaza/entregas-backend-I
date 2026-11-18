import { readFile, writeFile } from "node:fs/promises";
import ServiceManager from "./ServiceManager.js";
import { randomUUID } from "node:crypto";

const serviceManager = new ServiceManager()

class BookingManager {
    constructor() {
        this.path = new URL("../data/bookings.json", import.meta.url)
    }

    async readBookings() {
        const contenido = await readFile(this.path, "utf-8");
        return JSON.parse(contenido)
    }

    async saveBookings(bookings) {
        const contenido = JSON.stringify(bookings, null, 2)
        await writeFile(this.path, contenido);
    }


    async createBooking(bookingData) {
        if (!bookingData) {
            throw new Error("No hay datos para crear un booking")
        }

        const requiredFields = [
            "clientName",
            "clientEmail",
            "date",
            "time",
            "status",
            "services"
        ]


        const isValid = requiredFields.every(field =>
            bookingData[field] !== undefined &&
            bookingData[field] !== null &&
            bookingData[field] !== "")

        if (!isValid) {
            throw new Error("Faltan campos obligatorios")
        }

        const bookings = await this.readBookings();

        // const id = randomUUID()
        const id = bookings.length > 0 ? Math.max(...bookings.map(booking => booking.id)) + 1 : 1;

        const newBooking = {
            id,
            ...bookingData,
            id,
        }

        bookings.push(newBooking)
        await this.saveBookings(bookings)

        return newBooking
    }

    async getBookingById(id) {
        const bookings = await this.readBookings()
        return bookings.find(booking => booking.id === Number(id));
    }

    async addServiceToBooking(bid, sid) {
        const bookings = await this.readBookings()

        const booking = bookings.find(booking => booking.id === Number(bid))

        if (!booking) {
            throw new Error("Reserva no encontrada")
        }

        const service = await serviceManager.getServiceByID(sid)

        if (!service) {
            throw new Error("Servicio no encontrado")
        }

        const bookingServices = bookings.find(booking => booking.id === bid).services
        const existingService = bookingServices.some(service => service.service === sid)

        if (existingService) {
            bookingServices.forEach(service => {
                if (service.service === sid) {
                    service.quantity += 1
                }
            });
        } else {
            bookingServices.push({
                service: Number(sid),
                quantity: 1
            })
        }
        await this.saveBookings(bookings)
        return booking
    }
}

export default BookingManager