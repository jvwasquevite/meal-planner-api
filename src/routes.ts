import { Router } from "express"
import { CreateIngredientController } from "./controller/createIngredientController"
import { CreateRecipeController } from "./controller/createRecipeController"

const routes = Router()

routes.post("/ingredient", new CreateIngredientController().handle)
routes.post("/recipe", new CreateRecipeController().handle)

export { routes }
