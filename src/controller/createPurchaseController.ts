import { Request, Response } from "express"
import { CreatePurchaseUseCase } from "../useCases/createPurchaseUseCase"

export class CreatePurchaseController {
  async handle(request: Request, response: Response) {
    const purchaseItems = request.body

    const useCase = new CreatePurchaseUseCase()

    const result = await useCase.execute(purchaseItems)

    return response.json(result)
  }
}
