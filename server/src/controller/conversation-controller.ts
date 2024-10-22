import type { Request, Response } from "express"

import conversation from "../model/Conversation"

export const newConversation = async (request: Request, response: Response) => {
	const { senderId, receiverId } = request.body

	const exists = await conversation.findOne({
		members: { $all: [senderId, receiverId] },
	})

	if (exists) {
		console.log("Conversation already exists")
		response.status(200).json("Conversation already exists")
		return
	}

	const newConversation = new conversation({
		members: [senderId, receiverId],
	})

	try {
		const savedConversation = await newConversation.save()
		console.log("savedConversation", savedConversation)
		response.status(200).json(savedConversation)
	} catch (error) {
		response.status(500).json(error)
	}
}

export const getConversation = async (request: Request, response: Response) => {
	const { senderId, receiverId } = request.body
	try {
		const convo = await conversation.findOne({
			members: { $all: [senderId, receiverId] },
		})
		console.log("sending convo")
		response.status(200).json(convo)
	} catch (error) {
		response.status(500).json(error)
	}
}
