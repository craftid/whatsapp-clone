import { useEffect } from "react"
import { AttachFile, EmojiEmotions, Mic } from "@mui/icons-material"
import { Box, InputBase, styled } from "@mui/material"

import { uploadFile } from "@/service/api"

const Container = styled(Box)`
	height: 55px;
	background: #ededed;
	width: 100%;
	display: flex;
	align-items: center;
	padding: 0 15px;
	& > * {
		margin: 5px;
		color: #919191;
	}
`

const Search = styled(Box)`
	border-radius: 18px;
	background-color: #ffffff;
	width: calc(94% - 100px);
`

const InputField = styled(InputBase)`
	width: 100%;
	padding: 20px;
	padding-left: 25px;
	font-size: 14px;
	height: 20px;
	width: 100%;
`

const ClipIcon = styled(AttachFile)`
	transform: "rotate(40deg)";
`

const Footer = ({
	sendText,
	value,
	setValue,
	setFile,
	file,
	setImage,
}: {
	sendText: (
		e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void
	value: string
	setValue: (value: string) => void
	setFile: (file: any) => void
	file: any
	setImage: (data: any) => void
}) => {
	useEffect(() => {
		const getImage = async () => {
			if (file) {
				const data = new FormData()
				data.append("name", file.name)
				data.append("file", file)

				const response = await uploadFile(data)
				setImage(response.data)
			}
		}
		getImage()
	}, [file])

	return (
		<Container>
			<EmojiEmotions />
			<label htmlFor="fileInput">
				<ClipIcon />
			</label>
			<input
				type="file"
				id="fileInput"
				style={{ display: "none" }}
				onChange={(e) => {
					if (!e.target.files) return
					setValue(e.target.files[0].name)
					setFile(e.target.files[0])
				}}
			/>

			<Search>
				<InputField
					placeholder="Type a message"
					inputProps={{ "aria-label": "search" }}
					onChange={(e) => setValue(e.target.value)}
					onKeyDown={(e) => sendText(e)}
					value={value}
				/>
			</Search>
			<Mic />
		</Container>
	)
}

export default Footer
