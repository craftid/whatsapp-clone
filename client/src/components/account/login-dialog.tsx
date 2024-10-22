import env from "@/env"
import { useContext, useEffect } from "react"
import styled from "@emotion/styled"
import { Box, Dialog, List, ListItem, Typography } from "@mui/material"
import {
	GoogleLogin,
	useGoogleOneTapLogin,
	type CredentialResponse,
} from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"

import { AccountContext } from "@/context/account-provider"
import { addUser } from "@/service/api"

const Container = styled(Box)`
	padding: 56px 0 56px 56px;
`

const QRCode = styled("img")({
	margin: "50px 0 0 50px",
	height: 264,
	width: 264,
})

const Title = styled(Typography)`
	font-size: 26px;
	margin-bottom: 25px;
	color: #525252;
	font-family:
		Segoe UI,
		Helvetica Neue,
		Helvetica,
		Lucida Grande,
		Arial,
		Ubuntu,
		Cantarell,
		Fira Sans,
		sans-serif;
	font-weight: 300;
`

const StyledList = styled(List)`
	& > li {
		padding: 0;
		margin-top: 15px;
		font-size: 18px;
		line-height: 28px;
		color: #4a4a4a;
	}
`

const dialogStyle = {
	marginTop: "12%",
	height: "95%",
	width: "60%",
	maxWidth: "100",
	maxHeight: "100%",
	borderRadius: 0,
	boxShadow: "none",
	overflow: "hidden",
}

const LoginDialog = () => {
	const {
		setAccount,
		showLoginButton,
		setShowLoginButton,
		setShowLogoutButton,
	} = useContext(AccountContext)

	const onLoginSuccess = async (res: CredentialResponse) => {
		if (!res.credential) {
			return
		}
		localStorage.setItem("credentials", res.credential)
		const decoded = jwtDecode(res.credential)
		setAccount(decoded as any)
		setShowLoginButton(false)
		setShowLogoutButton(true)
		await addUser(decoded)
	}

	const onLoginFailure = () => {
		console.log("Login Failed:")
	}

	useGoogleOneTapLogin({
		onSuccess: onLoginSuccess,
		onError: onLoginFailure,
	})

	const credentials = localStorage.getItem("credentials")

	useEffect(() => {
		if (credentials) {
			onLoginSuccess({ credential: credentials })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<Dialog open={true} maxWidth="md" PaperProps={{ sx: dialogStyle }}>
			<Box
				sx={{
					display: "flex",
				}}
			>
				<Container>
					<Title>To use WhatsApp on your computer:</Title>
					<StyledList>
						<ListItem>1. Open WhatsApp on your phone</ListItem>
						<ListItem>2. Tap Menu Settings and select WhatsApp Web</ListItem>
						<ListItem>
							3. Point your phone to this screen to capture the code
						</ListItem>
					</StyledList>
				</Container>
				<Box style={{ position: "relative" }}>
					<QRCode
						src={`https://api.qrserver.com/v1/create-qr-code/?size=264x264&data=${env.VITE_PUBLIC_URL}`}
						alt="QR Code"
					/>
					<Box
						style={{
							position: "absolute",
							top: "50%",
							transform: "translateX(25%) translateY(-25%)",
						}}
					>
						{showLoginButton ? (
							<GoogleLogin
								auto_select
								onSuccess={onLoginSuccess}
								onError={onLoginFailure}
							/>
						) : null}
					</Box>
				</Box>
			</Box>
		</Dialog>
	)
}

export default LoginDialog
