import type { Request, Response } from "express"

import conversation from "../model/Conversation"
import message from "../model/Message"

export const newMessage = async (request: Request, response: Response) => {
	const newMessage = new message(request.body)
	try {
		await newMessage.save()
		await conversation.findByIdAndUpdate(request.body.conversationId, {
			message: request.body.text,
		})
		response.status(200).json("Message has been sent successfully")
	} catch (error) {
		response.status(500).json(error)
	}
}

export const getMessage = async (request: Request, response: Response) => {
	try {
		const messages = await message.find({ conversationId: request.params.id })
		response.status(200).json(messages)
	} catch (error) {
		response.status(500).json(error)
	}
}
