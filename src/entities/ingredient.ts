import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm"
import { v4 as uuid } from "uuid"

import { IngredientUnits } from "./ingredient_units"
import { IngredientMeasurements } from "./ingredient_measurements"
import { RecipeIngredient } from "./recipe_ingredient"
import { IngredientPricing } from "./ingredient_pricing"

@Entity("ingredient")
class Ingredient {
  @PrimaryColumn()
  readonly id: string

  @Column()
  name: string

  @Column()
  category: string

  @OneToOne(type => IngredientUnits, {
    cascade: true,
  })
  @JoinColumn()
  units: IngredientUnits

  @OneToOne(
    type => IngredientMeasurements,
    ingredientMeasurements => ingredientMeasurements.ingredient,
    {
      cascade: true,
    }
  )
  @JoinColumn()
  measurements: IngredientMeasurements

  @OneToMany(
    type => RecipeIngredient,
    recipeIngredient => recipeIngredient.ingredient,
    {
      cascade: true,
    }
  )
  recipes: RecipeIngredient[]

  @OneToMany(
    type => IngredientPricing,
    ingredientPricing => ingredientPricing.ingredient,
    { cascade: true }
  )
  pricings: IngredientPricing[]

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Ingredient }
