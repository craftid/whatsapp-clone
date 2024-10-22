import { useEffect, useState } from "react"
import { Box, CircularProgress } from "@mui/material"

import ChatHeader from "@/components/chat/area/chat-header"
import Messages from "@/components/chat/area/messages"

import { useAccount } from "@/context/account-provider"
import { useUser } from "@/context/user-provider"
import { getConversation } from "@/service/api"

const ChatBox = () => {
	const userContext = useUser()
	const accountContext = useAccount()

	if (
		!userContext ||
		!accountContext ||
		!userContext.person ||
		!accountContext.account
	) {
		return (
			<Box>
				<CircularProgress />
			</Box>
		)
	}

	const { person } = userContext
	const { account } = accountContext

	const [conversation, setConversation] = useState({})

	useEffect(() => {
		const getConversationDetails = async () => {
			let data = await getConversation({
				senderId: account.sub,
				receiverId: person.sub,
			})
			console.log(`gpt convo`, data)
			setConversation(data)
		}
		getConversationDetails()
	}, [person.sub])

	return (
		<Box style={{ height: "75%" }}>
			{JSON.stringify(conversation) === "{}" && <CircularProgress />}
			<ChatHeader person={person} />
			<Messages person={person} conversation={conversation} />
		</Box>
	)
}

export default ChatBox
