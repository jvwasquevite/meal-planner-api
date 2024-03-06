import { Database } from "../database"
import { MealPlan } from "../entities/mealplan"
import { MealPlanRecipe } from "../entities/mealplan_recipe"

export class listMealPlansUseCase {
  async execute() {
    const repo = Database.getRepository(MealPlan)
    const mealPlanRecipeRepo = Database.getRepository(MealPlanRecipe)

    const mealPlans = await repo.find()

    const mealPlanData = []

    for (const mealPlan of mealPlans) {
      const mealPlanItem = {
        id: mealPlan.id,
        name: mealPlan.name,
        created_at: mealPlan.created_at.toLocaleString("pt-BR", {
          month: "long",
          year: "numeric",
        }),
        recipes: [],
      }

      const mealPlanRecipes = await mealPlanRecipeRepo
        .createQueryBuilder("mealplan_recipe")
        .leftJoinAndSelect("mealplan_recipe.recipe", "recipe")
        .where("mealplan_recipe.mealplanId = :mealPlanId", {
          mealPlanId: mealPlan.id,
        })
        .getMany()

      mealPlanRecipes.forEach(mealPlanRecipe => {
        mealPlanItem.recipes.push({
          id: mealPlanRecipe.recipe.id,
          name: mealPlanRecipe.recipe.name,
        })
      })

      mealPlanData.push(mealPlanItem)
    }

    return mealPlanData
  }
}
