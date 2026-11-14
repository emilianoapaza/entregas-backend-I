import { Router } from "express"
import ServiceManager from "../managers/ServiceManager.js"

const serviceManager = new ServiceManager()


const router = Router()

router.get("/", async (req, res) => {
    const query = req.query;
    try {

        const services = await serviceManager.getServices(query)
        console.log(services)

        res.status(200).json({
            status: "succes",
            payload: services
        })

    } catch (error) {
        res.status(400).json({
            message: `${error}`
        })
    }
})

router.get("/:sid", async (req, res) => {
    const { sid } = req.params;
    const service = await serviceManager.getServiceByID(sid)
    if (!service) {
        return res.status(404).json({
            message: "El servicio no existe"
        })
    }
    res.status(200).json({
        status: "succes",
        payload: service
    })
})

router.post("/", async (req, res) => {
    const data = req.body
    try {
        const newService = await serviceManager.addService(data)
        res.status(201).json({
            status: "succes",
            payload: newService
        })
    } catch (error) {
        res.status(400).json({
            message: `${error}`
        })
    }
})

router.put("/:sid", async (req, res) => {
    const { sid } = req.params
    const updateData = req.body

    if (!updateData) {
        return res.status(400).json({
            status: "Debes ingresar datos para actualizar"
        })
    }

    try {
        const service = await serviceManager.updateService(sid, updateData)

        if (!service) {
            return res.status(404).json({
                message: "El servicio no existe"
            })
        }

        res.status(200).json({
            status: "Servicio actualizado",
            payload: service
        })

    } catch (error) {
        res.status(400).json({
            message: `${error}`
        })
    }

})

router.delete("/:sid", async (req, res) => {
    const { sid } = req.params;

    const services = await serviceManager.deleteService(sid)

    if (!services) {
        return res.status(404).json({
            message: "El servicio no existe"
        })
    }

    res.status(200).json({
        status: "success",
        payload: services
    })
})

export default router