import { Request, Response } from "express"
import { CreateRecipesInBatchUseCase } from "../useCases/createRecipesInBatchUseCase"

export class CreateRecipesInBatchController {
  async handle(request: Request, response: Response) {
    const recipes = request.body

    const useCase = new CreateRecipesInBatchUseCase()

    const result = await useCase.execute(recipes)

    return response.json(result)
  }
}
