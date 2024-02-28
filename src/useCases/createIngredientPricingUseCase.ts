import { Database } from "../database"
import { Ingredient } from "../entities/ingredient"
import { IngredientPricing } from "../entities/ingredient_pricing"

type IngredientPricingRequest = {
  ingredient_id: string
  date: Date
  price: number
}

export class createIngredientPricingUseCase {
  async execute({
    ingredient_id,
    date,
    price,
  }: IngredientPricingRequest): Promise<IngredientPricing | Error> {
    const repo = Database.getRepository(IngredientPricing)
    const ingredientRepo = Database.getRepository(Ingredient)

    const ingredientExists = await ingredientRepo.findOneBy({
      id: ingredient_id,
    })

    if (!ingredientExists) {
      return new Error("Ingredient does not exist")
    }

    const ingredientPricing = repo.create({ ingredient_id, date, price })

    await repo.save(ingredientPricing)

    return ingredientPricing
  }
}
