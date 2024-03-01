import { Request, Response } from "express"
import { ListIngredientsUseCase } from "../useCases/listIngredientsUseCase"

export class ListIngredientsController {
  async handle(request: Request, response: Response) {
    const useCase = new ListIngredientsUseCase()

    const result = await useCase.execute()

    return response.json(result)
  }
}
