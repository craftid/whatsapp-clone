import { Router } from "express"

import conversationRoutes from "./conversation"
import fileRoutes from "./file"
import messageRoutes from "./message"
import userRoutes from "./user"

const router = Router()

router.use("/user", userRoutes)
router.use("/conversation", conversationRoutes)
router.use("/message", messageRoutes)
router.use("/file", fileRoutes)

router.get("/", async (req, res) => {
	// Handle /api requests
	res.json({ message: "Hello from API" })
})

export default router
