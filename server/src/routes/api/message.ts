import { Router } from "express"

import { getMessage, newMessage } from "../../controller/message-controller"

const router = Router()

router.post("/add", newMessage)
router.get("/get/:id", getMessage)

export default router
