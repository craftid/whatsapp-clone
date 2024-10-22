import { Router } from "express"

import { getImage, uploadImage } from "../../controller/image-controller"
import upload from "../../utils/upload"

const router = Router()

router.post("upload", upload.single("file"), uploadImage)
router.get(":filename", getImage)

export default router
