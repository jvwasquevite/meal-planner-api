import { Request, Response } from "express"
import { getRecipeUseCase } from "../useCases/getRecipeUseCase"

export class GetRecipeController {
  async handle(request: Request, response: Response) {
    const { recipe_id } = request.params

    const useCase = new getRecipeUseCase()

    const result = await useCase.execute({ recipe_id })

    if (result instanceof Error) {
      return response.status(400).json(result.message)
    }

    return response.json(result)
  }
}
