
import express, { Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config({debug:true})

const app = express()
const PORT = process.env.PORT || 3000
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use(express.json())

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Hello World!" })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
export default app