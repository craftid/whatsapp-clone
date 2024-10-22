import { useEffect, useRef, useState } from "react"
import { Box, styled } from "@mui/material"

import Footer from "@/components/chat/area/footer"
import Message from "@/components/chat/area/single-message"

import { GoogleOAuthUser } from "@/App"
import { useAccount } from "@/context/account-provider"
import { getMessages, newMessages } from "@/service/api"

const Wrapper = styled(Box)`
	background-image: url(${"https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png"});
	background-size: 50%;
`

const Component = styled(Box)`
	height: 80vh;
	overflow-y: scroll;
`

const Container = styled(Box)`
	padding: 1px 80px;
`

export interface Message {
	senderId: string
	receiverId: string
	conversationId: string
	type: string
	text: string
}

interface MessagesProps {
	person: GoogleOAuthUser
	conversation: any
}

const Messages = ({ person, conversation }: MessagesProps) => {
	const [messages, setMessages] = useState<Message[]>([])
	const [incomingMessage, setIncomingMessage] = useState<Message | null>(null)
	const [value, setValue] = useState<string>("")
	const [file, setFile] = useState(null)
	const [image, setImage] = useState<string | null>("")

	const scrollRef = useRef<HTMLDivElement>(null)

	const accountContext = useAccount()

	const { account, socket, newMessageFlag, setNewMessageFlag } = accountContext
	if (!account || !socket) return null

	useEffect(() => {
		socket.current.on("getMessage", (data) => {
			setIncomingMessage({
				...data,
				createdAt: Date.now(),
			})
		})
	}, [])

	useEffect(() => {
		const getMessageDetails = async () => {
			let data = await getMessages(conversation?._id)
			setMessages(data)
		}
		getMessageDetails()
	}, [conversation?._id, person._id, newMessageFlag])

	useEffect(() => {
		scrollRef.current?.scrollIntoView({
			behavior: "smooth",
		})
	}, [messages])

	useEffect(() => {
		incomingMessage &&
			conversation?.members?.includes(incomingMessage.senderId) &&
			setMessages((prev) => [...prev, incomingMessage as Message])
	}, [incomingMessage, conversation])

	const receiverId = conversation?.members?.find(
		(member: any) => member !== account.sub
	)

	const sendText = async (e: any) => {
		let code = e.keyCode || e.which
		if (!value) return

		if (code === 13) {
			let message = {}
			if (!file) {
				message = {
					senderId: account.sub,
					receiverId: receiverId,
					conversationId: conversation._id,
					type: "text",
					text: value,
				}
			} else {
				message = {
					senderId: account.sub,
					conversationId: conversation._id,
					receiverId: receiverId,
					type: "file",
					text: image,
				}
			}

			socket.current.emit("sendMessage", message)

			await newMessages(message)

			setValue("")
			setFile(null)
			setImage("")
			setNewMessageFlag((prev) => !prev)
		}
	}

	return (
		<Wrapper>
			<Component>
				{messages &&
					messages.map((message, id) => (
						<Container ref={scrollRef} key={id}>
							<Message message={message} />
						</Container>
					))}
			</Component>
			<Footer
				sendText={sendText}
				value={value}
				setValue={setValue}
				setFile={setFile}
				file={file}
				setImage={setImage}
			/>
		</Wrapper>
	)
}

export default Messages
