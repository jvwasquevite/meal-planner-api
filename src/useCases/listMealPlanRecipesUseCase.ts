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

    const recipes = await repo
      .createQueryBuilder("mealplan_recipe")
      .leftJoinAndMapMany("recipes", "mealplan_recipe.recipe", "recipe.id")
      .where("mealplan_recipe.mealplanId = :mealplan_id", { mealplan_id })
      .getMany()

    return recipes
  }
}
