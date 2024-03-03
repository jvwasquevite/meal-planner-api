import { Database } from "../database"
import { MealPlan } from "../entities/mealplan"

export class listMealPlansUseCase {
  async execute() {
    const repo = Database.getRepository(MealPlan)

    const mealPlans = await repo.find()

    return mealPlans
  }
}
