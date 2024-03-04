import { Database } from "../database"
import { Ingredient } from "../entities/ingredient"
import { IngredientMeasurements } from "../entities/ingredient_measurements"
import { IngredientUnits } from "../entities/ingredient_units"

export class CreateIngredientsInBatchUseCase {
  async execute(
    ingredientsData: {
      name: string
      category: string
      units: {
        consumption_unit: string
        sales_unit: string
        quantity_per_sales_unit: number
      }
      measurements: {
        max_weight: number
        tablespoon: number
        tea_cup: number
        cup: number
      }
    }[]
  ) {
    const repo = Database.getRepository(Ingredient)
    const unitsRepo = Database.getRepository(IngredientUnits)
    const measurementsRepo = Database.getRepository(IngredientMeasurements)

    const ingredients: Ingredient[] = []

    for (const data of ingredientsData) {
      const ingredient = new Ingredient()
      ingredient.name = data.name
      ingredient.category = data.category
      ingredients.push(ingredient)

      const units = new IngredientUnits()
      units.consumption_unit = data.units.consumption_unit
      units.sales_unit = data.units.sales_unit
      units.quantity_per_sales_unit = data.units.quantity_per_sales_unit

      const measurements = new IngredientMeasurements()
      measurements.max_weight = data.measurements.max_weight
      measurements.tablespoon = data.measurements.tablespoon
      measurements.tea_cup = data.measurements.tea_cup
      measurements.cup = data.measurements.cup

      // Save the units and measurements to the database
      await unitsRepo.save(units)
      await measurementsRepo.save(measurements)

      // Associate the units and measurements with the ingredient
      ingredient.units = units
      ingredient.measurements = measurements
    }

    await repo.save(ingredients)
  }
}
