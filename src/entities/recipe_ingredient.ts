import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm"
import { v4 as uuid } from "uuid"

import { Ingredient } from "./ingredient"
import { Recipe } from "./recipe"

@Entity("recipe_ingredient")
class RecipeIngredient {
  @PrimaryColumn()
  readonly id: string

  @ManyToOne(() => Recipe)
  recipe_id: Recipe

  @ManyToOne(() => Ingredient)
  ingredient_id: Ingredient

  @Column()
  quantity: number

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { RecipeIngredient }
