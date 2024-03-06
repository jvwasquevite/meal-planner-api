import { Request, Response } from "express"
import { GetMealPlanUseCase } from "../useCases/getMealPlanUseCase"

export class GetMealPlanController {
  async handle(request: Request, response: Response) {
    const { id } = request.params

    const useCase = new GetMealPlanUseCase()

    const result = await useCase.execute({ id })

    return response.json(result)
  }
}
