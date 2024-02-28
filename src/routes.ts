import { Router } from "express"
import { CreateIngredientController } from "./controller/createIngredientController"
import { CreateRecipeController } from "./controller/createRecipeController"
import { CreateIngredientPricingController } from "./controller/createIngredientPricingController"

const routes = Router()

routes.post("/ingredient", new CreateIngredientController().handle)
routes.post(
  "/pricing/:ingredient_id",
  new CreateIngredientPricingController().handle
)
routes.post("/recipe", new CreateRecipeController().handle)

export { routes }
