import { Request, Response } from "express"
import { listMealPlansUseCase } from "../useCases/listMealPlansUseCase"

export class ListMealPlanController {
  async handle(request: Request, response: Response) {
    const useCase = new listMealPlansUseCase()

    const result = await useCase.execute()

    return response.json(result)
  }
}
