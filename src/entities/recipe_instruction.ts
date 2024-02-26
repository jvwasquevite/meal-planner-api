import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm"
import { v4 as uuid } from "uuid"

import { Recipe } from "./recipe"

@Entity("recipe_instruction")
class RecipeInstruction {
  @PrimaryColumn()
  readonly id: string

  @ManyToOne(() => Recipe)
  recipe_id: Recipe

  @Column()
  name: string

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { RecipeInstruction }
