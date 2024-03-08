import { Router } from "express"
import { CreateIngredientController } from "./controller/createIngredientController"
import { CreateRecipeController } from "./controller/createRecipeController"
import { CreateMealPlannerController } from "./controller/createMealPlanController"
import { ListRecipesController } from "./controller/listRecipesController"
import { GetRecipeController } from "./controller/getRecipeController"
import { ListMealPlanController } from "./controller/listMealPlansController"
import { ListIngredientsController } from "./controller/listIngredientsController"
import { GetIngredientByNameController } from "./controller/getIngredientByNameController"
import { listMealPlanRecipesController } from "./controller/listMealPlanRecipesController"
import { listMealPlanIngredientsController } from "./controller/listMealPlanIngredientsController"
import { CreateIngredientInBatchController } from "./controller/createIngredientsInBatchController"
import { GetMealPlanController } from "./controller/getMealPlanController"
import { CreatePurchaseController } from "./controller/createPurchaseController"
import { updateIngredientPricings } from "./middlewares/updateIngredientPricings"
import { CreateRecipesInBatchController } from "./controller/createRecipesInBatchController"

const routes = Router()

routes.post("/ingredient", new CreateIngredientController().handle)
routes.post("/ingredients", new CreateIngredientInBatchController().handle)
routes.get("/ingredients", new ListIngredientsController().handle)
routes.get("/ingredient/:name", new GetIngredientByNameController().handle)

routes.post("/recipe", new CreateRecipeController().handle)
routes.post("/recipes", new CreateRecipesInBatchController().handle)
routes.get("/recipes", new ListRecipesController().handle)
routes.get("/recipe/:recipe_id", new GetRecipeController().handle)

routes.post("/mealplan", new CreateMealPlannerController().handle)
routes.get("/mealplans", new ListMealPlanController().handle)
routes.get("/mealplan/:id", new GetMealPlanController().handle)
routes.get(
  "/mealplan/recipes/:mealplan_id",
  new listMealPlanRecipesController().handle
)
routes.get(
  "/mealplan/ingredients/:mealplan_id",
  updateIngredientPricings,
  new listMealPlanIngredientsController().handle
)

routes.post("/purchase", new CreatePurchaseController().handle)

export { routes }
