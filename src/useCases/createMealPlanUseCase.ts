import { Timestamp } from "typeorm"
import { Database } from "../database"

import { MealPlan } from "../entities/meal_plan"
import { Weekday } from "../entities/weekday"

type MealPlanRequest = {
  name: string
  weekdays: Weekday[]
}

export class createMealPlanUseCase {
  async execute({ name, weekdays }: MealPlanRequest): Promise<MealPlan> {
    const repo = Database.getRepository(MealPlan)

    const mealPlan = repo.create({ name, weekdays })

    await repo.save(mealPlan)

    return mealPlan
  }
}
