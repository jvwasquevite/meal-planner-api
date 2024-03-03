import { Database } from "../database"

import { MealPlan } from "../entities/mealplan"
import { MealPlanRecipe } from "../entities/mealplan_recipe"

type MealPlanRequest = {
  name: string
  recipes: MealPlanRecipe[]
}

export class createMealPlanUseCase {
  async execute({ name, recipes }: MealPlanRequest): Promise<MealPlan> {
    const repo = Database.getRepository(MealPlan)

    const mealPlan = repo.create({ name, recipes })

    await repo.save(mealPlan)

    return mealPlan
  }
}
