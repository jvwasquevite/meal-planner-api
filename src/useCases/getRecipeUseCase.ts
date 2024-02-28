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

    const recipe = await repo.find({
      where: { id: recipe_id },
      relations: ["ingredients", "instructions"],
    })

    return recipe
  }
}
