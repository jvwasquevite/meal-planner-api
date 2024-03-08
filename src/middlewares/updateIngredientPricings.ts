import { NextFunction, Request, Response } from "express"
import { Database } from "../database"
import { Ingredient } from "../entities/ingredient"
import { IngredientPricings } from "../entities/ingredient_pricings"

export async function updateIngredientPricings(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const ingredientRepository = Database.getRepository(Ingredient)
  const pricingRepository = Database.getRepository(IngredientPricings)

  const ingredients = await ingredientRepository.find({
    relations: ["purchases", "pricings"],
  })

  for (const ingredient of ingredients) {
    const prices = ingredient.purchases
      .map(purchase => purchase.price)
      .filter(price => !isNaN(price))

    const minPrice = prices.length > 0 ? Math.min(...prices) : 0
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 0
    const avgPrice =
      prices.length > 0
        ? prices.reduce(
            (acc, curr) =>
              parseFloat(acc.toString()) + parseFloat(curr.toString()),
            0
          ) / prices.length
        : 0

    if (!ingredient.pricings) {
      const pricing = new IngredientPricings()

      pricing.minimum = minPrice
      pricing.maximum = maxPrice
      pricing.average = avgPrice

      await pricingRepository.save(pricing)
      ingredient.pricings = pricing
    } else {
      ingredient.pricings.minimum = minPrice
      ingredient.pricings.maximum = maxPrice
      ingredient.pricings.average = avgPrice
    }

    await ingredientRepository.save(ingredient)
  }

  return next()
}
