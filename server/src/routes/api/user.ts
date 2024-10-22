import { Router } from "express"

import { addUser, getUsers } from "../../controller/user-controller"

const router = Router()

router.post("/add", addUser)
router.get("/allUsers", getUsers)

export default router
