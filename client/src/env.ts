import { z } from "zod"

// Define the schema for environment variables
const envSchema = z.object({
	VITE_API_URL: z.string().url().optional().default("http://localhost:5173"),
	VITE_PUBLIC_URL: z.string().url().optional().default("http://localhost:5173"),
})

// Parse and validate environment variables
const env = envSchema.parse(import.meta.env ?? process.env)

export default env
