import { useEffect, useState } from "react"
import { Box, Divider, styled } from "@mui/material"

import Conversation from "@/components/chat/menu/user-conversation"

import { GoogleOAuthUser } from "@/App"
import { useAccount } from "@/context/account-provider"
import { getUsers } from "@/service/api"

const Component = styled(Box)`
	overflow: overlay;
	height: 81vh;
`

const StyledDivider = styled(Divider)`
	background-color: #e9edef;
	opacity: 0.6;
`

const Conversations = ({ text }: { text: string }) => {
	const [users, setUsers] = useState<GoogleOAuthUser[]>([])

	const accountContext = useAccount()
	if (!accountContext) {
		console.error("Account context is not found")
		return <div>Account context is not found</div>
	}
	const { account, socket, setActiveUsers } = accountContext
	if (!account) {
		console.error("Account is not found")
		return <div>Account is not found</div>
	}

	useEffect(() => {
		const fetchData = async () => {
			let data = await getUsers()
			let filteredData = data.filter(
				(user: GoogleOAuthUser) =>
					user.name.toLowerCase().includes(text.toLowerCase()) &&
					user.sub !== account.sub
			)
			setUsers(filteredData)
		}
		fetchData()
	}, [text])

	useEffect(() => {
		socket.current.emit("addUser", account)
		socket.current.on("getUsers", (users) => {
			console.log("socket users", users)
			setActiveUsers(users)
		})
	}, [account, socket.current])

	return (
		<Component>
			{users &&
				users.map(
					(user, index) =>
						user.sub !== account.sub && (
							<Component key={user._id}>
								<Conversation user={user} />
								{users.length !== index + 1 && <StyledDivider />}
							</Component>
						)
				)}
		</Component>
	)
}

export default Conversations
