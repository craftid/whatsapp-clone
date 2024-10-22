import type { Request, Response } from "express"

import user from "../model/User"

export const addUser = async (request: Request, response: Response) => {
	try {
		let exist = await user.findOne({ sub: request.body.sub })

		if (exist) {
			console.log("user already exists")
			response.status(200).json("user already exists")
			return
		}

		const newUser = new user(request.body)
		await newUser.save()
		response.status(200).json(newUser)
	} catch (error) {
		response.status(500).json(error)
	}
}

export const getUsers = async (_request: Request, response: Response) => {
	try {
		const data = await user.find()
		response.status(200).json(data)
	} catch (error) {
		response.status(500).json(error)
	}
}
