import { Request, Response } from "express"
import { CreateIngredientsInBatchUseCase } from "../useCases/createIngredientsInBatchUseCase"

export class CreateIngredientInBatchController {
  async handle(request: Request, response: Response) {
    const ingredientData = request.body

    const useCase = new CreateIngredientsInBatchUseCase()

    const result = await useCase.execute(ingredientData)

    return response.json(result)
  }
}
