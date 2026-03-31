
import "dotenv/config"
import express from "express"
import type { Request, Response } from "express"
import cors from "cors"
import { toNodeHandler } from "better-auth/node"
import { auth } from "./lib/auth"
import ProfileRoutes from "./routes/profile.route"
import UsersRoutes from "./routes/users.route"

const app = express()
const PORT = process.env.PORT || 3000
app.use(cors({
  origin:process.env.ORIGIN!,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))

app.use(express.json())
app.use("/api/profile",ProfileRoutes);
app.use("/api/users",UsersRoutes);
// app.use("/api/conversations",ConversationRoutes);
// app.use("/api/messages",MessageRoutes)

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Hello World!" })
})
app.all("/api/auth/*splat", toNodeHandler(auth));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
export default app