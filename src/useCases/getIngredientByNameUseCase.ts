import { Database } from "../database"
import { Ingredient } from "../entities/ingredient"

import { ILike } from "typeorm"

type getIngredientByNameRequest = {
  name: string
}

export class GetIngredientByNameUseCase {
  async execute({ name }: getIngredientByNameRequest) {
    const repo = Database.getRepository(Ingredient)

    const ingredient = await repo.findOneBy({ name: ILike(name) })

    return ingredient
  }
}
