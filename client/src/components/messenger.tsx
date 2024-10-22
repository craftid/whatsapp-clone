import { useContext } from "react"
import { AppBar, Box, styled, Toolbar } from "@mui/material"

import LoginDialog from "@/components/account/login-dialog"
import ChatDialog from "@/components/chat/chat-dialog"

//components
// import ChatDialog from './chat/ChatDialog';
import { AccountContext } from "@/context/account-provider"

const Component = styled(Box)`
	height: 100vh;
	background: #dcdcdc;
`

const Header = styled(AppBar)`
	background-color: #00a884;
	height: 125px;
	box-shadow: none;
`

const LoginHeader = styled(AppBar)`
	background: #00bfa5;
	height: 200px;
	box-shadow: none;
`

const Messenger = () => {
	const { account } = useContext(AccountContext)

	return (
		<Component>
			{account ? (
				<>
					<Header>
						<Toolbar></Toolbar>
					</Header>
					<ChatDialog />
				</>
			) : (
				<>
					<LoginHeader>
						<Toolbar></Toolbar>
					</LoginHeader>
					<LoginDialog />
				</>
			)}
		</Component>
	)
}

export default Messenger
