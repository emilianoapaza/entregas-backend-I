import ServiceManager from "../managers/ServiceManager.js";
const serviceManager = new ServiceManager()

export const getServices = async (req, res) => {
    const query = req.query;
    try {

        const services = await serviceManager.getServices(query)

        res.status(200).json({
            status: "success",
            payload: services
        })

    } catch (error) {
        res.status(400).json({
            status: "error",
            message: `${error}`
        })
    }
}

export const getServiceById = async (req, res) => {
    const { sid } = req.params;
    const service = await serviceManager.getServiceByID(Number(sid))
    if (!service) {
        return res.status(404).json({
            status: "error",
            message: "El servicio no existe"
        })
    }
    res.status(200).json({
        status: "success",
        payload: service
    })
}

export const createService = async (req, res) => {
    const data = req.body
    try {
        const newService = await serviceManager.addService(data)
        res.status(201).json({
            status: "succes",
            payload: newService
        })
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: `${error}`
        })
    }
}

export const updateService = async (req, res) => {
    const { sid } = req.params
    const updateData = req.body

    if (!updateData) {
        return res.status(400).json({
            status: "error",
            message: "Debes ingresar datos para actualizar"
        })
    }

    try {
        const service = await serviceManager.updateService(Number(sid), updateData)

        if (!service) {
            return res.status(404).json({
                status: "error",
                message: "El servicio no existe"
            })
        }

        res.status(200).json({
            status: "Servicio actualizado",
            payload: service
        })

    } catch (error) {
        res.status(400).json({
            status: "error",
            message: `${error}`
        })
    }

}

export const deleteService = async (req, res) => {
    const { sid } = req.params;

    const services = await serviceManager.deleteService(Number(sid))

    if (!services) {
        return res.status(404).json({
            message: "El servicio no existe"
        })
    }

    res.status(200).json({
        status: "success",
        payload: services
    })
}
