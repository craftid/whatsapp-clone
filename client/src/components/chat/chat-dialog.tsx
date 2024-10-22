import { Box, Dialog, styled } from "@mui/material"

import ChatBox from "@/components/chat/area/chat-box"
import EmptyChat from "@/components/chat/area/empty-chat"
import Menu from "@/components/chat/menu"

import { useUser } from "@/context/user-provider"

const Component = styled(Box)`
	display: flex;
`

const LeftComponent = styled(Box)`
	min-width: 450px;
`

const RightComponent = styled(Box)`
	width: 73%;
	min-width: 300px;
	border-left: 1px solid rgba(0, 0, 0, 0.14);
`

const dialogStyle = {
	width: "100%",
	margin: "20px",
	maxWidth: "100%",
	maxHeight: "100%",
	borderRadius: 0,
	boxShadow: "none",
	overflow: "hidden",
}

const ChatDialog = () => {
	const userContext = useUser()

	if (!userContext) {
		console.error("User context is not found")
		return null
	}
	const { person } = userContext
	return (
		<Dialog open={true} PaperProps={{ sx: dialogStyle }} maxWidth={"md"}>
			<Component>
				<LeftComponent>
					<Menu />
				</LeftComponent>
				<RightComponent>
					{person?._id ? <ChatBox /> : <EmptyChat />}
				</RightComponent>
			</Component>
		</Dialog>
	)
}

export default ChatDialog
