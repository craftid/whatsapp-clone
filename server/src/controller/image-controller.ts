import type { Request, Response } from "express"
import { connection, mongo } from "mongoose"

let gridfsBucket: mongo.GridFSBucket, gfs: mongo.GridFSBucketReadStream
const conn = connection.on("open", () => {
	if (!conn.db) return
	gridfsBucket = new mongo.GridFSBucket(conn.db, {
		bucketName: "uploads",
	})
})

export const uploadImage = async (request: Request, response: Response) => {
	try {
		if (!request.file) {
			response.status(400).json("No file uploaded")
			return
		}
		const file = request.file
		const upload = gridfsBucket.openUploadStream(file.originalname)
		const id = upload.id
		const stream = upload
		stream.write(file.buffer)
		stream.end()
		response.status(200).json(id)
	} catch (error) {
		response.status(500).json(error)
	}
}

export const getImage = async (request: Request, response: Response) => {
	try {
		gfs = gridfsBucket.openDownloadStreamByName(request.params.filename)
		gfs.pipe(response)
	} catch (error) {
		response.status(500).json(error)
	}
}
