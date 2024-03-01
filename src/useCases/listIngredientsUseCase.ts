import { Database } from "../database"
import { Ingredient } from "../entities/ingredient"

export class ListIngredientsUseCase {
  async execute() {
    const repo = Database.getRepository(Ingredient)

    const ingredients = await repo.find({
      relations: ["units", "measurements"],
    })

    return ingredients
  }
}
