import express from "express"
import { Database } from "./database"
import { routes } from "./routes"

Database.initialize()
  .then(() => {
    console.log("Database has been initialized!")
  })
  .catch(err => {
    console.error("Error during Database initialization:", err)
  })

const app = express()
app.use(express.json())

app.use(routes)

app.listen(3000, () => console.log("Server is running"))
