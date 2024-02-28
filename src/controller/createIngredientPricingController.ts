import { Request, Response } from "express"
import { createIngredientPricingUseCase } from "../useCases/createIngredientPricingUseCase"

export class CreateIngredientPricingController {
  async handle(request: Request, response: Response) {
    const { ingredient_id } = request.params
    const { date, price } = request.body

    const useCase = new createIngredientPricingUseCase()

    const result = await useCase.execute({ ingredient_id, date, price })

    if (result instanceof Error) {
      return response.status(400).json(result.message)
    }

    return response.json(result)
  }
}
