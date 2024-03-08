import { Request, Response } from "express"
import { CreateRecipeByIngredientNameUseCase } from "../useCases/createRecipeByIngredientNameUseCase"

export class CreateRecipeByIngredientNameController {
  async handle(request: Request, response: Response) {
    const { name, servings, hours, ingredients, instructions } = request.body

    const useCase = new CreateRecipeByIngredientNameUseCase()

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
