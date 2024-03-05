import { Database } from "../database"
import { Ingredient } from "../entities/ingredient"
import { IngredientMeasurements } from "../entities/ingredient_measurements"

import { Recipe } from "../entities/recipe"
import { RecipeIngredient } from "../entities/recipe_ingredient"
import { RecipeInstruction } from "../entities/recipe_instruction"

type RecipeRequest = {
  name: string
  servings: number
  hours: number
  ingredients: {
    ingredient: Ingredient
    quantity: number
    measurement_unit: string
  }[]
  instructions: RecipeInstruction[]
}

export class createRecipeUseCase {
  async execute({
    name,
    servings,
    hours,
    ingredients,
    instructions,
  }: RecipeRequest): Promise<Recipe> {
    const repo = Database.getRepository(Recipe)
    const recipeIngredientRepo = Database.getRepository(RecipeIngredient)

    const recipe = repo.create({
      name,
      servings,
      hours,
      instructions,
    })

    await repo.save(recipe)

    for (const { ingredient, quantity, measurement_unit } of ingredients) {
      const recipeIngredient = recipeIngredientRepo.create({
        recipe: recipe,
        ingredient,
        quantity,
        measurement_unit,
        converted_quantity: await this.convertQuantity(
          ingredient.toString(),
          quantity,
          measurement_unit
        ),
      })

      await recipeIngredientRepo.save(recipeIngredient)
    }

    return recipe
  }

  async convertQuantity(
    ingredient_id: string,
    quantity: number,
    measurement_unit: string
  ) {
    const repo = Database.getRepository(Ingredient)
    const repoIngredientMeasurements = Database.getRepository(
      IngredientMeasurements
    )

    const ingredient = await repo.findOne({ where: { id: ingredient_id } })
    const ingredientMeasurements = await repoIngredientMeasurements.findOne({
      where: { ingredient: ingredient },
    })

    switch (measurement_unit) {
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
