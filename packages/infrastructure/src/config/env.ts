import { dirname, join } from "path"
import { fileURLToPath } from "url"

import { config as dotenvConfig } from "dotenv"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const envPath = join(__dirname, "..", "..", "..", "..", ".env")

dotenvConfig({ path: envPath })

export const config = {
  SERVER_URI: process.env.SERVER_URI
} as const
