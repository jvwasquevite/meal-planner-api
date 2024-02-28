import { Request, Response } from "express"
import { listRecipesUseCase } from "../useCases/listRecipesUseCase"

export class ListRecipesController {
  async handle(request: Request, response: Response) {
    const useCase = new listRecipesUseCase()

    const result = await useCase.execute()

    return response.json(result)
  }
}
