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

    await Promise.all(
      purchaseItems.map(async item => {
        const purchaseItem = ingredientPurchaseRepo.create({
          purchase,
          ingredient: item.ingredient,
          price: item.price,
        })

        await ingredientPurchaseRepo.save(purchaseItem)
      })
    )

    const totalSpent = purchaseItems.reduce((acc, item) => acc + item.price, 0)

    purchase.total_spent = totalSpent
    await repo.save(purchase)

    return purchase
  }
}
