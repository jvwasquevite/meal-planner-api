import { Request, Response } from "express"
import { GetIngredientByNameUseCase } from "../useCases/getIngredientByNameUseCase"

export class GetIngredientByNameController {
  async handle(request: Request, response: Response) {
    const { name } = request.params

    const useCase = new GetIngredientByNameUseCase()

    const result = await useCase.execute({ name })

    return response.json(result)
  }
}
