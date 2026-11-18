import { readFile, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";

class ServiceManager {
    constructor() {
        this.path = new URL("../data/services.json", import.meta.url)
    }

    async readServices() {
        const contenido = await readFile(this.path, "utf-8");
        return JSON.parse(contenido)
    }

    async saveServices(services) {
        const contenido = JSON.stringify(services, null, 2)
        await writeFile(this.path, contenido);
    }

    async getServices(query) {
        const { category, available } = query
        const allowedFilters = ["category", "available"]

        const receivedFilters = Object.keys(query)
        const invalidFilter = receivedFilters.find(filter => !allowedFilters.includes(filter))
        if (invalidFilter) {
            throw new Error(`El filtro ${invalidFilter} no es valido`)
        }

        const availableBoolean = (available === "true")

        const services = await this.readServices();

        if (!category && !available) {
            return services
        }

        let serviceFiltered = services;

        const categories = [...new Set(
            services.map(service => service.category)
        )]

        if (category && !categories.includes(category)) {
            throw new Error("La categoria especificada no es valida")
        }

        if (category) {
            serviceFiltered = services.filter(service => service.category === category)
        }

        if (available) {
            if (available !== "true" && available !== "false") {
                throw new Error("El available especificado no es valido")
            }

            serviceFiltered = serviceFiltered.filter(service => service.available === availableBoolean)
        }

        return serviceFiltered
    }

    async getServiceByID(id) {
        const services = await this.readServices()
        const resultado = services.find(service => service.id === id);
        return resultado
    }

    async addService(serviceData) {
        if (!serviceData) {
            throw new Error("No hay datos para crear un servicio")
        }

        const requiredFields = [
            "name",
            "description",
            "duration",
            "price",
            "category",
            "available"
        ]

        const isValid = requiredFields.every(field =>
            serviceData[field] !== undefined &&
            serviceData[field] !== null &&
            serviceData[field] !== "")

        if (!isValid) {
            throw new Error("Faltan campos obligatorios")
        }

        const services = await this.readServices();

        const id = randomUUID()

        const newServices = {
            id,
            ...serviceData,
            id,
        }

        services.push(newServices)
        await this.saveServices(services)

        return newServices
    }


    async updateService(id, updateData) {
        const services = await this.readServices()
        const index = services.findIndex(service => service.id === id)

        if (index === -1) {
            return null
        }

        const requiredFields = [
            "name",
            "description",
            "duration",
            "price",
            "category",
            "available"
        ]

        const isValid = requiredFields.every(field =>
            updateData[field] !== undefined &&
            updateData[field] !== null &&
            updateData[field] !== "")

        if (!isValid) {
            throw new Error("Faltan campos obligatorios")
        }

        const { id: ignoredID, ...data } = updateData

        services[index] = {
            ...services[index],
            ...data,
            id
        }

        await this.saveServices(services)

        return services[index]
    }

    async deleteService(id) {
        const services = await this.readServices()

        const index = services.findIndex(service => service.id === id);

        if (index === -1) {
            return null;
        }

        const [deleteService] = services.splice(index, 1)

        await this.saveServices(services)

        return deleteService
    }

}

export default ServiceManager;