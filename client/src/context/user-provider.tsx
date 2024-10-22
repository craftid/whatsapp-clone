import { createContext, ReactNode, useContext, useState } from "react"

import { GoogleOAuthUser } from "@/App"

interface UserContextType {
	person: GoogleOAuthUser | null
	setPerson: React.Dispatch<React.SetStateAction<GoogleOAuthUser | null>>
}

export const UserContext = createContext<UserContextType | null>(
	{} as UserContextType
)

interface UserProviderProps {
	children: ReactNode
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
	const [person, setPerson] = useState<GoogleOAuthUser | null>(null)

	return (
		<UserContext.Provider value={{ person, setPerson }}>
			{children}
		</UserContext.Provider>
	)
}

export const useUser = () => useContext(UserContext)

export default UserProvider
