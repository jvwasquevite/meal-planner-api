import { Request, Response } from "express"
import { createRecipeUseCase } from "../useCases/createRecipeUseCase"

export class CreateRecipeController {
  async handle(request: Request, response: Response) {
    const { name, servings, hours, ingredients, instructions } = request.body

    const useCase = new createRecipeUseCase()

    const result = await useCase.execute({
      name,
      servings,
      hours,
      ingredients,
      instructions,
    })

    return response.json(result)
  }
}
