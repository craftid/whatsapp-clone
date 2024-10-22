import env from "@/env"
import { createContext, useContext, useEffect, useRef, useState } from "react"
import { io, type Socket } from "socket.io-client"

import { GoogleOAuthUser } from "@/App"

export interface Account {
	account: GoogleOAuthUser | null
	setAccount: React.Dispatch<React.SetStateAction<GoogleOAuthUser | null>>
	showLoginButton: boolean
	setShowLoginButton: React.Dispatch<React.SetStateAction<boolean>>
	showLogoutButton: boolean
	setShowLogoutButton: React.Dispatch<React.SetStateAction<boolean>>
	socket: React.MutableRefObject<Socket>
	activeUsers: GoogleOAuthUser[]
	setActiveUsers: React.Dispatch<React.SetStateAction<GoogleOAuthUser[]>>
	newMessageFlag: boolean
	setNewMessageFlag: React.Dispatch<React.SetStateAction<boolean>>
}

export const AccountContext = createContext<Account>({} as Account)

export const AccountProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const [account, setAccount] = useState<GoogleOAuthUser | null>(null)
	const [showLoginButton, setShowLoginButton] = useState(true)
	const [showLogoutButton, setShowLogoutButton] = useState(false)

	const [activeUsers, setActiveUsers] = useState<GoogleOAuthUser[]>([])
	const [newMessageFlag, setNewMessageFlag] = useState(false)

	const socket = useRef() as React.MutableRefObject<Socket>

	useEffect(() => {
		socket.current = io(env.VITE_PUBLIC_URL as string)
		const currentSocket = socket.current
		return () => {
			currentSocket.disconnect()
		}
	}, [])

	return (
		<AccountContext.Provider
			value={{
				account,
				setAccount,
				showLoginButton,
				setShowLoginButton,
				showLogoutButton,
				setShowLogoutButton,
				socket,
				activeUsers,
				setActiveUsers,
				newMessageFlag,
				setNewMessageFlag,
			}}
		>
			{children}
		</AccountContext.Provider>
	)
}

export const useAccount = () => useContext(AccountContext)
