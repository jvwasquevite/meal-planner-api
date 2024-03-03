import { Request, Response } from "express"
import { listMealPlanRecipesUseCase } from "../useCases/listMealPlanRecipesUseCase"

export class listMealPlanRecipesController {
  async handle(request: Request, response: Response) {
    const { mealplan_id } = request.params

    const useCase = new listMealPlanRecipesUseCase()

    const result = await useCase.execute({ mealplan_id })

    return response.json(result)
  }
}
