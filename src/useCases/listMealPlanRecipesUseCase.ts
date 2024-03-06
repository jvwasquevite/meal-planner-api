import { Database } from "../database"
import { MealPlanRecipe } from "../entities/mealplan_recipe"

type listMealPlanRecipesRequest = {
  mealplan_id: string
}

export class listMealPlanRecipesUseCase {
  async execute({ mealplan_id }: listMealPlanRecipesRequest) {
    const repo = Database.getRepository(MealPlanRecipe)

    const mealPlanRecipes = await repo.find({
      where: {
        mealplan: { id: mealplan_id },
      },
      relations: ["recipe"],
    })

    const recipes = mealPlanRecipes.map(mealPlanRecipe => mealPlanRecipe.recipe)

    return recipes
  }
}
