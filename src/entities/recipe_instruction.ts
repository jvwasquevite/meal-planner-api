import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { v4 as uuid } from "uuid"

import { Recipe } from "./recipe"

@Entity("recipe_instruction")
class RecipeInstruction {
  @PrimaryColumn()
  readonly id: string

  @ManyToOne(type => Recipe, recipe => recipe.instructions)
  recipe: Recipe

  @Column()
  name: string

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { RecipeInstruction }
