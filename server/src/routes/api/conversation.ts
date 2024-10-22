import { Router } from "express"

import {
	getConversation,
	newConversation,
} from "../../controller/conversation-controller"

const router = Router()

router.post("/add", newConversation)
router.post("/get", getConversation)

export default router
