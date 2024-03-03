import { Database } from "../database"
import { Recipe } from "../entities/recipe"

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

    const recipeJson = JSON.stringify({
      ...recipe,
      ingredients: ingredients,
    })

    return JSON.parse(recipeJson)
  }
}
