import { Suspense } from "react"
import { CircularProgress, CssBaseline, ThemeProvider } from "@mui/material"
import { GoogleOAuthProvider } from "@react-oauth/google"

import Messenger from "@/components/messenger"

import { AccountProvider } from "@/context/account-provider"
import UserProvider from "@/context/user-provider"
import theme from "@/theme"

export interface GoogleOAuthUser {
	_id: string
	sub: string
	email: string
	name: string
	imageUrl: string
	picture: string
}

const clientId =
	"40987970669-prf8vd7t6kquqjr9fumfhk55q19h1m85.apps.googleusercontent.com"

export const App = () => {
	return (
		<GoogleOAuthProvider clientId={clientId}>
			<UserProvider>
				<AccountProvider>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						<Suspense fallback={<CircularProgress />}>
							<Messenger />
						</Suspense>
					</ThemeProvider>
				</AccountProvider>
			</UserProvider>
		</GoogleOAuthProvider>
	)
}

export default App
