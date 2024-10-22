import env from "@/env"
import { type JwtPayload } from "jwt-decode"

export const addUser = async (account: JwtPayload) => {
	try {
		const res = await fetch(`${env.VITE_PUBLIC_URL}/api/user/add`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(account),
		})
		return res.json()
	} catch (err) {
		console.error(err)
	}
}

export const getUsers = async () => {
	try {
		const res = await fetch(`${env.VITE_PUBLIC_URL}/api/user/allUsers`)
		return res.json()
	} catch (err) {
		console.error(err)
	}
}

export const getMessages = async (id: string) => {
	try {
		const res = await fetch(`${env.VITE_PUBLIC_URL}/api/message/get/${id}`)
		return res.json()
	} catch (err) {
		console.error(err)
	}
}

export const newMessages = async (data: any) => {
	try {
		const res = await fetch(`${env.VITE_PUBLIC_URL}/api/message/add`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
		return res.json()
	} catch (err) {
		console.error(err)
	}
}

export const getConversation = async (data: {
	senderId: string
	receiverId: string
}) => {
	try {
		const res = await fetch(`${env.VITE_PUBLIC_URL}/api/conversation/get`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
		return res.json()
	} catch (err) {
		console.error(err)
	}
}

export const setConversation = async (data: {
	senderId: string
	receiverId: string
}) => {
	try {
		const res = await fetch(`${env.VITE_PUBLIC_URL}/api/conversation/add`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
		return res.json()
	} catch (err) {
		console.error(err)
	}
}

export const uploadFile = async (data: FormData) => {
	try {
		const res = await fetch(`${env.VITE_PUBLIC_URL}/api/upload`, {
			method: "POST",
			body: data,
		})
		return res.json()
	} catch (err) {
		console.error(err)
	}
}
