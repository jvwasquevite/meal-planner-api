import { Request, Response } from "express"
import { CreateIngredientUseCase } from "../useCases/createIngredientUseCase"

export class CreateIngredientController {
  async handle(request: Request, response: Response) {
    const { name, category, units, measurements } = request.body

    const useCase = new CreateIngredientUseCase()

    const result = await useCase.execute({
      name,
      category,
      units,
      measurements,
    })

    if (result instanceof Error) {
      return response.status(400).json(result.message)
    }

    return response.json(result)
  }
}
