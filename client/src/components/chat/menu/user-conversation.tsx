import { useEffect, useState } from "react"
import { Box, styled, Typography } from "@mui/material"

import { GoogleOAuthUser } from "@/App"
import { useAccount } from "@/context/account-provider"
import { useUser } from "@/context/user-provider"
import { getConversation, setConversation } from "@/service/api"
import { formatDate } from "@/utils/common"

const Component = styled(Box)`
	display: flex;
	padding: 13px 0;
	cursor: pointer;
`

const Image = styled("img")({
	width: 50,
	height: 50,
	objectFit: "cover",
	borderRadius: "50%",
	margin: "0 14px",
})

const Container = styled(Box)`
	display: flex;
`

const Timestamp = styled(Typography)`
	font-size: 12px;
	margin-left: auto;
	color: #00000099;
	margin-right: 20px;
`

const Text = styled(Typography)`
	display: block;
	color: rgba(0, 0, 0, 0.6);
	font-size: 14px;
`

const Conversation = ({ user }: { user: GoogleOAuthUser }) => {
	const url =
		user.picture || `https://api.dicebear.com/9.x/lorelei/svg?seed=${user.name}`

	const userContext = useUser()
	const accountContext = useAccount()
	if (!userContext || !accountContext) {
		console.error("User or account context is not found")
		return <div>User or account context is not found</div>
	}
	const { setPerson } = userContext
	const { account, newMessageFlag } = accountContext

	const [message, setMessage] = useState<{
		text: string
		timestamp: string
	}>({} as { text: string; timestamp: string })

	useEffect(() => {
		const getConversationMessage = async () => {
			if (!account || !user) return
			const data = await getConversation({
				senderId: account.sub,
				receiverId: user.sub,
			})
			setMessage({ text: data?.message, timestamp: data?.updatedAt })
		}
		getConversationMessage()
	}, [newMessageFlag])

	const getUser = async () => {
		if (!account || !user) return
		setPerson(user)
		await setConversation({ senderId: account.sub, receiverId: user.sub })
	}

	return (
		<Component onClick={() => getUser()}>
			<Box>
				<Image src={url} alt="display picture" />
			</Box>
			<Box style={{ width: "100%" }}>
				<Container>
					<Typography>{user.name}</Typography>
					{message?.text && (
						<Timestamp>{formatDate(message?.timestamp)}</Timestamp>
					)}
				</Container>
				<Box>
					<Text>
						{message?.text?.includes("localhost") ? "media" : message.text}
					</Text>
				</Box>
			</Box>
		</Component>
	)
}

export default Conversation
