import { Database } from "../database"
import { MealPlanRecipe } from "../entities/mealplan_recipe"

type getMealPlanRequest = {
  id: string
}

export class GetMealPlanUseCase {
  async execute({ id }: getMealPlanRequest) {
    const repo = Database.getRepository(MealPlanRecipe)

    const recipes = await repo.find({
      where: {
        mealplan: { id },
      },
      relations: ["recipe"],
    })

    // Group recipes by weekday and meal block
    const groupedRecipes: Record<string, Record<string, any[]>> = {}

    recipes.forEach(recipe => {
      const weekday = recipe.weekday
      const mealBlock = recipe.mealblock
      if (!groupedRecipes[weekday]) {
        groupedRecipes[weekday] = {}
      }
      if (!groupedRecipes[weekday][mealBlock]) {
        groupedRecipes[weekday][mealBlock] = []
      }
      groupedRecipes[weekday][mealBlock].push(recipe.recipe)
    })

    return groupedRecipes
  }
}
