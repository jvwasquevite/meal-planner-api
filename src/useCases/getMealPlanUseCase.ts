import { Database } from "../database"
import { MealPlan } from "../entities/mealplan"
import { MealPlanRecipe } from "../entities/mealplan_recipe"

type getMealPlanRequest = {
  id: string
}

export class GetMealPlanUseCase {
  async execute({ id }: getMealPlanRequest) {
    const repo = Database.getRepository(MealPlanRecipe)
    const repo2 = Database.getRepository(MealPlan)

    const mealPlan = await repo2.findOne({ where: { id } })

    const recipes = await repo.find({
      where: {
        mealplan: { id },
      },
      relations: ["recipe"],
    })

    const groupedRecipes: Record<string, Record<string, any[]>> = {}

    recipes.forEach(recipe => {
      const { weekday, mealblock, recipe: recipeObject } = recipe // Assuming `recipe.recipe` is the actual recipe object
      if (!groupedRecipes[weekday]) {
        groupedRecipes[weekday] = {}
      }
      if (!groupedRecipes[weekday][mealblock]) {
        groupedRecipes[weekday][mealblock] = []
      }
      groupedRecipes[weekday][mealblock].push(recipeObject)
    })

    // Construct the meal plan item with recipes grouped by weekday and meal block
    const mealPlanItem = {
      id: mealPlan.id,
      name: mealPlan.name,
      created_at: mealPlan.created_at.toLocaleString("pt-BR", {
        month: "long",
        year: "numeric",
      }),
      recipes: [],
    }

    for (const [weekday, mealblocks] of Object.entries(groupedRecipes)) {
      mealPlanItem.recipes.push({
        weekday,
        mealblocks,
      })
    }

    return mealPlanItem
  }
}
