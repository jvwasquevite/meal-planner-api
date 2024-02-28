import { Router } from "express"
import { CreateIngredientController } from "./controller/createIngredientController"
import { CreateRecipeController } from "./controller/createRecipeController"
import { CreateIngredientPricingController } from "./controller/createIngredientPricingController"
import { CreateMealPlannerController } from "./controller/createMealPlanController"
import { ListRecipesController } from "./controller/listRecipesController"

const routes = Router()

routes.post("/ingredient", new CreateIngredientController().handle)
routes.post(
  "/pricing/:ingredient_id",
  new CreateIngredientPricingController().handle
)

routes.post("/recipe", new CreateRecipeController().handle)
routes.get("/recipes", new ListRecipesController().handle)

routes.post("/mealplan", new CreateMealPlannerController().handle)

export { routes }
