import { Database } from "../database"
import { Recipe } from "../entities/recipe"
import { RecipeInstruction } from "../entities/recipe_instruction"

type getRecipeRequest = {
  recipe_id: string
}

export class getRecipeUseCase {
  async execute({ recipe_id }: getRecipeRequest) {
    const repo = Database.getRepository(Recipe)

    const recipeExists = await repo.findOneBy({ id: recipe_id })

    if (!recipeExists) {
      return new Error("Recipe does not exist")
    }

    const recipe = await repo
      .createQueryBuilder("recipe")
      .leftJoinAndSelect("recipe.ingredients", "recipe_ingredient")
      .leftJoinAndSelect("recipe_ingredient.ingredient", "ingredient")
      .leftJoinAndSelect("recipe.instructions", "instruction")
      .where("recipe.id = :id", { id: recipe_id })
      .getOne()

    // Extract ingredients with IDs, names, and quantities
    const ingredients = recipe.ingredients.map(recipeIngredient => {
      return {
        id: recipeIngredient.ingredient.id,
        name: recipeIngredient.ingredient.name,
        quantity: recipeIngredient.quantity,
      }
    })

    // Minify recipe instructions showing only a string array
    const instructions = recipe.instructions.map(instruction => {
      return instruction.name
    })

    const recipeJson = JSON.stringify({
      ...recipe,
      ingredients: ingredients,
      instructions: instructions,
    })

    return JSON.parse(recipeJson)
  }
}
