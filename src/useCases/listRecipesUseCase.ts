import { Database } from "../database"
import { Recipe } from "../entities/recipe"

export class listRecipesUseCase {
  async execute() {
    const repo = Database.getRepository(Recipe)

    const recipes = await repo
      .createQueryBuilder("recipe")
      .leftJoinAndSelect("recipe.ingredients", "recipe_ingredient")
      .leftJoinAndSelect("recipe_ingredient.ingredient", "ingredient")
      .leftJoinAndSelect("recipe.instructions", "instruction")
      .getMany()

    // Parse time notation to :h and :min strings
    recipes.map(recipe => {
      var hours = recipe.hours.split(":")
      recipe.hours = hours[0] == "00" ? hours[1] + " min" : hours[0] + "h"
    })

    // Minify recipe ingredients and instructions
    const recipesWithIngredientsAndInstructionsMinified = recipes.map(
      recipe => {
        const ingredients = recipe.ingredients.map(recipeIngredient => {
          return {
            id: recipeIngredient.ingredient.id,
            name: recipeIngredient.ingredient.name,
            quantity: recipeIngredient.quantity,
            converted_quantity: recipeIngredient.converted_quantity,
            measurement: recipeIngredient.measurement_unit,
          }
        })

        const instructions = recipe.instructions.map(instruction => {
          return instruction.name
        })

        return {
          ...recipe,
          ingredients: ingredients,
          instructions: instructions,
        }
      }
    )

    return recipesWithIngredientsAndInstructionsMinified
  }
}
