
import express from "express"
import type { Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import { toNodeHandler } from "better-auth/node"
import { auth } from "./lib/auth"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
app.use(cors({
  origin:process.env.ORIGIN!,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))

app.use(express.json())

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Hello World!" })
})
app.all("/api/auth/*splat", toNodeHandler(auth));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
export default app