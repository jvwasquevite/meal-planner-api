import { Request, Response } from "express"
import { listMealPlanIngredientsUseCase } from "../useCases/listMealPlanIngredientsUseCase"

export class listMealPlanIngredientsController {
  async handle(request: Request, response: Response) {
    const { mealplan_id } = request.params

    const useCase = new listMealPlanIngredientsUseCase()

    const result = await useCase.execute({ mealplan_id })

    return response.json(result)
  }
}
