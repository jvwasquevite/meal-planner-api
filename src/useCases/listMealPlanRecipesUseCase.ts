import { Database } from "../database"
import { MealPlan } from "../entities/mealplan"
import { MealPlanRecipe } from "../entities/mealplan_recipe"
import { Recipe } from "../entities/recipe"

type listMealPlanIngredientsRequest = {
  mealplan_id: string
}

export class listMealPlanRecipesUseCase {
  async execute({ mealplan_id }: listMealPlanIngredientsRequest) {
    const repo = Database.getRepository(MealPlanRecipe)

    const recipes = await repo.find({
      where: {
        mealplan: { id: mealplan_id },
      },
      relations: ["recipe"],
    })

    const recipesNames = recipes.map(recipe => recipe.recipe.name)

    return recipesNames
  }
}
