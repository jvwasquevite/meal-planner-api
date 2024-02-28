import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm"
import { v4 as uuid } from "uuid"
import { RecipeInstruction } from "./recipe_instruction"
import { RecipeIngredient } from "./recipe_ingredient"

@Entity("recipe")
class Recipe {
  @PrimaryColumn()
  readonly id: string

  @Column()
  name: string

  @Column()
  servings: number

  @Column()
  hours: number

  @OneToMany(
    type => RecipeIngredient,
    recipeIngredient => recipeIngredient.recipe,
    {
      cascade: true,
    }
  )
  ingredients: RecipeIngredient[]

  @OneToMany(
    type => RecipeInstruction,
    recipeInstruction => recipeInstruction.recipe,
    {
      cascade: true,
    }
  )
  instructions: RecipeInstruction[]

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Recipe }
