import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { v4 as uuid } from "uuid"

import { Ingredient } from "./ingredient"
import { Recipe } from "./recipe"

@Entity("recipe_ingredient")
class RecipeIngredient {
  @PrimaryColumn()
  readonly id: string

  @ManyToOne(type => Recipe, recipe => recipe.ingredients, {
    eager: true,
  })
  @JoinColumn()
  recipe: Recipe

  @ManyToOne(type => Ingredient, ingredient => ingredient.recipes, {
    eager: true,
  })
  @JoinColumn()
  ingredient: Ingredient

  @Column()
  quantity: number

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { RecipeIngredient }
