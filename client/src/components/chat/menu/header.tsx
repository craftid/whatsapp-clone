import { useContext, useState } from "react"
import { Chat as MessageIcon, MoreVert } from "@mui/icons-material"
import { Box, IconButton, Menu, MenuItem, styled } from "@mui/material"

import InfoDrawer from "@/components/chat/drawer"

import { AccountContext } from "@/context/account-provider"

const MenuOption = styled(MenuItem)`
font-size: 14px
padding: 15px 60px 5px 24px;
color: #4A4A4A;
`

const Component = styled(Box)`
	background: #ededed;
	display: flex;
	padding: 8px 16px;
	align-items: center;
`

const Wrapper = styled(Box)`
	margin-left: auto;
	gap: 2px;
`

const Image = styled("img")({
	height: 40,
	width: 40,
	borderRadius: "50%",
})

const Header = () => {
	const [anchorEl, setAnchorEl] = useState<Element | null>(null)
	const [open, setOpen] = useState(false)

	const [openDrawer, setOpenDrawer] = useState(false)
	const { account } = useContext(AccountContext)

	const toggleDrawer = () => {
		setOpenDrawer(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	if (!account) return null

	return (
		<>
			<Component>
				<Image src={account.picture} onClick={() => toggleDrawer()} />
				<Wrapper>
					<IconButton>
						<MessageIcon aria-label="message" />
					</IconButton>
					<IconButton
						aria-label="more"
						onClick={(e) => setAnchorEl(e.currentTarget)}
					>
						<MoreVert />
					</IconButton>
					<Menu
						anchorEl={anchorEl}
						keepMounted
						open={open}
						onClose={handleClose}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "center",
						}}
						transformOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
					>
						<MenuOption
							onClick={() => {
								handleClose()
								toggleDrawer()
							}}
						>
							Profile
						</MenuOption>
						<MenuOption
							onClick={() => {
								handleClose()
							}}
						>
							{/* { showlogoutButton ?
                    <Logout
                        clientId={clientId}
                        buttonText="Logout"
                        onLogoutSuccess={onSignoutSuccess}
                    >
                    </Logout> : null
                } */}
						</MenuOption>
					</Menu>
				</Wrapper>
			</Component>
			<InfoDrawer open={openDrawer} setOpen={setOpenDrawer} profile={true} />
		</>
	)
}

export default Header
