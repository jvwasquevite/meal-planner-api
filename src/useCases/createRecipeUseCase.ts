import { Database } from "../database"

import { Recipe } from "../entities/recipe"
import { RecipeIngredient } from "../entities/recipe_ingredient"
import { RecipeInstruction } from "../entities/recipe_instruction"

type RecipeRequest = {
  name: string
  servings: number
  hours: number
  ingredients: RecipeIngredient[]
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

    const recipe = repo.create({
      name,
      servings,
      hours,
      ingredients,
      instructions,
    })

    await repo.save(recipe)

    return recipe
  }
}
