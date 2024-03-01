import { Router } from "express"
import { CreateIngredientController } from "./controller/createIngredientController"
import { CreateRecipeController } from "./controller/createRecipeController"
import { CreateIngredientPricingController } from "./controller/createIngredientPricingController"
import { CreateMealPlannerController } from "./controller/createMealPlanController"
import { ListRecipesController } from "./controller/listRecipesController"
import { GetRecipeController } from "./controller/getRecipeController"
import { ListMealPlanController } from "./controller/listMealPlansController"
import { ListIngredientsController } from "./controller/listIngredientsController"

const routes = Router()

routes.post("/ingredient", new CreateIngredientController().handle)
routes.get("/ingredients", new ListIngredientsController().handle)
routes.post(
  "/pricing/:ingredient_id",
  new CreateIngredientPricingController().handle
)

routes.post("/recipe", new CreateRecipeController().handle)
routes.get("/recipes", new ListRecipesController().handle)
routes.get("/recipe/:recipe_id", new GetRecipeController().handle)

routes.post("/mealplan", new CreateMealPlannerController().handle)
routes.get("/mealplans", new ListMealPlanController().handle)

export { routes }
