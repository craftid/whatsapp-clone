import multer from "multer"
import { GridFsStorage } from "multer-gridfs-storage"

import env from "../env"

const storage = new GridFsStorage({
	url: env.MONGO_URI,
	file: (_request, file) => {
		const match = ["image/png", "image/jpg"]

		if (match.indexOf(file.memeType) === -1)
			return `${Date.now()}-blob-${file.originalname}`

		return {
			bucketName: "photos",
			filename: `${Date.now()}-blob-${file.originalname}`,
		}
	},
})

export default multer({ storage })
