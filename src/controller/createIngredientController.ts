import { Request, Response } from "express"
import { CreateIngredient } from "../useCases/createIngredientUseCase"

export class CreateIngredientController {
  async handle(request: Request, response: Response) {
    const { name, category } = request.body

    const useCase = new CreateIngredient()

    const result = await useCase.execute({ name, category })

    return response.json(result)
  }
}
