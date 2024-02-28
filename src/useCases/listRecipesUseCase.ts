import { Database } from "../database"
import { Recipe } from "../entities/recipe"

export class listRecipesUseCase {
  async execute() {
    const repo = Database.getRepository(Recipe)

    const recipes = await repo.find({
      relations: ["ingredients", "instructions"],
    })

    return recipes
  }
}
