import { Database } from "../database"
import { MealPlan } from "../entities/mealplan"

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

    // Initialize an array to store aggregated ingredients
    const mealPlanIngredients = []

    // Iterate over each recipe in the meal plan
    mealPlan.recipes.forEach(mealPlanRecipe => {
      // Iterate over each ingredient in the recipe
      mealPlanRecipe.recipe.ingredients.forEach(recipeIngredient => {
        // Check if the ingredient is already included, if not, add it to the aggregated list
        const existingIngredient = mealPlanIngredients.find(
          ingredient => ingredient.id === recipeIngredient.ingredient.id
        )
        if (!existingIngredient) {
          mealPlanIngredients.push({
            id: recipeIngredient.ingredient.id,
            name: recipeIngredient.ingredient.name,
            quantity: recipeIngredient.quantity,
          })
        } else {
          // If the ingredient already exists, update its quantity
          existingIngredient.quantity += recipeIngredient.quantity
        }
      })
    })

    return mealPlanIngredients
  }
}
