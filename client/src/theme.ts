import { createTheme } from "@mui/material/styles"

// A custom theme for this app
const theme = createTheme({
	cssVariables: true,
	palette: {
		primary: {
			main: "#00A884",
		},
		secondary: {
			main: "#00bfa5",
		},
	},
})

export default theme
