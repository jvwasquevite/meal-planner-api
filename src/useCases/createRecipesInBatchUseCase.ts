import { Database } from "../database"
import { Recipe } from "../entities/recipe"
import { Ingredient } from "../entities/ingredient"
import { IngredientMeasurements } from "../entities/ingredient_measurements"
import { RecipeIngredient } from "../entities/recipe_ingredient"
import { RecipeInstruction } from "../entities/recipe_instruction"

type RecipeItem = {
  name: string
  servings: number
  hours: string
  ingredients: {
    ingredientId: string
    quantity: number
    measurement_unit: string
  }[]
  instructions: RecipeInstruction[]
}

export class CreateRecipesInBatchUseCase {
  async execute(recipes: RecipeItem[]): Promise<Recipe[]> {
    const recipeRepository = Database.getRepository(Recipe)
    const ingredientRepository = Database.getRepository(Ingredient)
    const ingredientMeasurementsRepository = Database.getRepository(
      IngredientMeasurements
    )
    const recipeIngredientRepository = Database.getRepository(RecipeIngredient)

    const createdRecipes: Recipe[] = []

    for (const recipeItem of recipes) {
      const { name, servings, hours, ingredients, instructions } = recipeItem

      const recipe = recipeRepository.create({
        name,
        servings,
        hours,
        instructions,
      })
      await recipeRepository.save(recipe)

      const recipeIngredients: RecipeIngredient[] = []

      for (const { ingredientId, quantity, measurement_unit } of ingredients) {
        const ingredient = await ingredientRepository.findOneOrFail({
          where: { id: ingredientId },
        })

        const ingredientMeasurements =
          await ingredientMeasurementsRepository.findOneOrFail({
            where: { ingredient },
          })

        const recipeIngredient = recipeIngredientRepository.create({
          recipe,
          ingredient,
          quantity,
          measurement_unit,
          converted_quantity: await this.convertQuantity(
            quantity,
            measurement_unit,
            ingredientMeasurements
          ),
        })

        recipeIngredients.push(recipeIngredient)
      }

      await recipeIngredientRepository.save(recipeIngredients)
      createdRecipes.push(recipe)
    }

    return createdRecipes
  }

  private convertQuantity(
    quantity: number,
    measurement_unit: string,
    ingredientMeasurements: IngredientMeasurements
  ): number {
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
