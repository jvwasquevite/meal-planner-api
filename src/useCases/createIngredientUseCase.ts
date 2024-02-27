import { Database } from "../database"

import { Ingredient } from "../entities/ingredient"
import { IngredientMeasurements } from "../entities/ingredient_measurements"
import { IngredientUnits } from "../entities/ingredient_units"

type IngredientRequest = {
  name: string
  category: string
  units: IngredientUnits
  measurements: IngredientMeasurements
}

export class CreateIngredientUseCase {
  async execute({
    name,
    category,
    units,
    measurements,
  }: IngredientRequest): Promise<Ingredient | Error> {
    const repo = Database.getRepository(Ingredient)

    if (await repo.findOne({ where: { name } })) {
      return new Error("Ingredient already exists")
    }

    const ingredient = repo.create({
      name,
      category,
      units,
      measurements,
    })

    await repo.save(ingredient)

    return ingredient
  }
}
