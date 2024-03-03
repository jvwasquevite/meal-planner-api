import { Request, Response } from "express"
import { createMealPlanUseCase } from "../useCases/createMealPlanUseCase"

export class CreateMealPlannerController {
  async handle(request: Request, response: Response) {
    const { name, recipes } = request.body

    const useCase = new createMealPlanUseCase()

    const result = await useCase.execute({ name, recipes })

    return response.json(result)
  }
}
