import { eventService } from "../services/event.service.js"

export const eventController = {
    createEvent:  async (req, res) =>{
        try{
            const newEvent = await eventService.buildAndSaveEvent(req.body);
            res.status(201).json({
                message: "Document saved",
                data: newEvent
            })
        }catch(error){
            res.status(500).json({
                Error : error.message
            })
        }
    }
}