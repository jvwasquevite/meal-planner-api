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

    // Convert recipes to JSON with ingredients and instructions minified for each recipe
    const recipesWithIngredientsAndInstructionsMinified = recipes.map(
      recipe => {
        const ingredients = recipe.ingredients.map(recipeIngredient => {
          return {
            id: recipeIngredient.ingredient.id,
            name: recipeIngredient.ingredient.name,
            quantity: recipeIngredient.quantity,
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
