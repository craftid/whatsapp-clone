import { useContext } from "react"
import { MoreVert, Search } from "@mui/icons-material"
import Person2Icon from "@mui/icons-material/Person2"
import { Box, IconButton, styled, Typography } from "@mui/material"

import { GoogleOAuthUser } from "@/App"
import { AccountContext } from "@/context/account-provider"

const Header = styled(Box)`
	background: #ededed;
	display: flex;
	padding: 8px 16px;
	align-items: center;
`

const Image = styled("img")({
	width: 40,
	height: 40,
	objectFit: "cover",
	borderRadius: "50%",
})

const Name = styled(Typography)`
	margin-left: 12px !important;
`

const RightContainer = styled(Box)`
	margin-left: auto;
	& > svg {
		padding: 8px;
		font-size: 22px;
		color: #000;
	}
`

const Status = styled(Typography)`
	font-size: 12px !important;
	color: rgb(0, 0, 0, 0.6);
	margin-left: 12px !important;
`

const ChatHeader = ({ person }: { person: GoogleOAuthUser }) => {
	const { activeUsers } = useContext(AccountContext)

	return (
		<Header>
			<Box>
				{person.picture ? (
					<Image src={person.picture} />
				) : (
					<Person2Icon sx={{ fontSize: 20 }} />
				)}
			</Box>
			<Box>
				<Name>{person.name}</Name>
				<Status>
					{activeUsers?.find((user) => user.sub === person.sub)
						? "Online"
						: "Offline"}
				</Status>
			</Box>
			<RightContainer>
				<IconButton>
					<Search />
				</IconButton>
				<IconButton>
					<MoreVert />
				</IconButton>
			</RightContainer>
		</Header>
	)
}

export default ChatHeader
