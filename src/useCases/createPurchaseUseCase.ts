import { Database } from "../database"
import { Ingredient } from "../entities/ingredient"
import { IngredientPurchase } from "../entities/ingredient_purchase"
import { Purchase } from "../entities/purchase"

export class CreatePurchaseUseCase {
  async execute(purchaseItems: { ingredient: Ingredient; price: number }[]) {
    const repo = Database.getRepository(Purchase)
    const ingredientPurchaseRepo = Database.getRepository(IngredientPurchase)

    const purchase = repo.create()
    await repo.save(purchase)

    purchaseItems.map(async item => {
      const purchaseItem = ingredientPurchaseRepo.create({
        purchase,
        ingredient: item.ingredient,
        price: item.price,
      })

      await ingredientPurchaseRepo.save(purchaseItem)
    })

    return purchase
  }
}
