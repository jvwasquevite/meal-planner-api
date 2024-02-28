import { Database } from "../database"
import { MealPlan } from "../entities/meal_plan"

export class listMealPlansUseCase {
  async execute() {
    const repo = Database.getRepository(MealPlan)

    const mealPlans = await repo.find({
      relations: [
        "weekdays",
        "weekdays.meal_blocks",
        "weekdays.meal_blocks.recipes",
      ],
    })

    return mealPlans
  }
}
