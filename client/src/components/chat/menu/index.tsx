import { useState } from "react"
import { Box } from "@mui/material"

import Conversations from "@/components/chat/menu/conversations"
import Header from "@/components/chat/menu/header"
import Search from "@/components/chat/menu/search"

const Menu = () => {
	const [text, setText] = useState("")

	return (
		<Box>
			<Header />
			<Search setText={setText} />
			<Conversations text={text} />
		</Box>
	)
}

export default Menu
