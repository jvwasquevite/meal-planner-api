import { Router } from "express"
import { CreateIngredientController } from "./controller/createIngredientController"

const routes = Router()

routes.post("/ingredient", new CreateIngredientController().handle)

export { routes }
