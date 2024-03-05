import { Database } from "../database"
import { MealPlan } from "../entities/mealplan"
import { convertIngredientQuantity } from "../middleware/convertIngredientQuantity"

type listMealPlanIngredientsRequest = {
  mealplan_id: string
}

export class listMealPlanIngredientsUseCase {
  async execute({ mealplan_id }: listMealPlanIngredientsRequest) {
    const repo = Database.getRepository(MealPlan)

    const mealPlan = await repo
      .createQueryBuilder("mealplan")
      .leftJoinAndSelect("mealplan.recipes", "mealplanRecipe")
      .leftJoinAndSelect("mealplanRecipe.recipe", "recipe")
      .leftJoinAndSelect("recipe.ingredients", "ingredients")
      .leftJoinAndSelect("ingredients.ingredient", "ingredient")
      .where("mealplan.id = :id", { id: mealplan_id })
      .getOne()

    const mealPlanIngredients = []

    // mealPlan.recipes.forEach(mealPlanRecipe => {
    //   mealPlanRecipe.recipe.ingredients.forEach(async recipeIngredient => {
    //     const existingIngredient = mealPlanIngredients.find(
    //       ingredient => ingredient.id === recipeIngredient.ingredient.id
    //     )
    //     if (!existingIngredient) {
    //       mealPlanIngredients.push({
    //         id: recipeIngredient.ingredient.id,
    //         name: recipeIngredient.ingredient.name,
    //         quantity: await convertIngredientQuantity({
    //           ingredient_id: recipeIngredient.ingredient.id,
    //           quantity: recipeIngredient.quantity,
    //           measurement: recipeIngredient.measurement,
    //         }),
    //       })
    //     } else {
    //       existingIngredient.quantity += await convertIngredientQuantity({
    //         ingredient_id: recipeIngredient.ingredient.id,
    //         quantity: recipeIngredient.quantity,
    //         measurement: recipeIngredient.measurement,
    //       })
    //     }
    //   })
    // })

    console.log(mealPlanIngredients)

    return mealPlanIngredients
  }
}
