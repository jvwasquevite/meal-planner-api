import { Database } from "../database"
import { Ingredient } from "../entities/ingredient"
import { IngredientMeasurements } from "../entities/ingredient_measurements"

import { Recipe } from "../entities/recipe"
import { RecipeIngredient } from "../entities/recipe_ingredient"
import { RecipeInstruction } from "../entities/recipe_instruction"

import { ILike } from "typeorm"

type RecipeRequest = {
  name: string
  servings: number
  hours: string
  ingredients: {
    name: string
    quantity: number
    measurement_unit: string
  }[]
  instructions: RecipeInstruction[]
}

export class CreateRecipeByIngredientNameUseCase {
  async execute({
    name,
    servings,
    hours,
    ingredients,
    instructions,
  }: RecipeRequest): Promise<Recipe> {
    const repo = Database.getRepository(Recipe)
    const recipeIngredientRepo = Database.getRepository(RecipeIngredient)
    const ingredientRepo = Database.getRepository(Ingredient)
    const ingredientMeasurementsRepo = Database.getRepository(
      IngredientMeasurements
    )

    const recipe = repo.create({
      name,
      servings,
      hours,
      instructions,
    })

    await repo.save(recipe)

    for (const { name, quantity, measurement_unit } of ingredients) {
      const ingredientByName = await ingredientRepo.findOneByOrFail({
        name: ILike(name),
      })

      const ingredientMeasurements =
        await ingredientMeasurementsRepo.findOneOrFail({
          where: { ingredient: ingredientByName },
        })

      const convertedQuantity = this.convertQuantity(
        quantity,
        measurement_unit,
        ingredientMeasurements
      )

      const recipeIngredient = recipeIngredientRepo.create({
        recipe,
        ingredient: ingredientByName,
        quantity,
        measurement_unit,
        converted_quantity: convertedQuantity,
      })

      await recipeIngredientRepo.save(recipeIngredient)
    }

    return recipe
  }

  private convertQuantity(
    quantity: number,
    measurementUnit: string,
    ingredientMeasurements: IngredientMeasurements
  ): number {
    switch (measurementUnit) {
      case "Colher de sopa":
        return quantity * ingredientMeasurements.tablespoon
      case "Xícara de chá":
        return quantity * ingredientMeasurements.tea_cup
      case "Copo":
        return quantity * ingredientMeasurements.cup
      default:
        return quantity
    }
  }
}
