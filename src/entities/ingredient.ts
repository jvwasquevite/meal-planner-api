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
import { IngredientPurchase } from "./ingredient_purchase"
import { IngredientPricings } from "./ingredient_pricings"

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
    type => IngredientPurchase,
    ingredientPurchase => ingredientPurchase.ingredient,
    { cascade: true }
  )
  purchases: IngredientPurchase[]

  @OneToOne(
    type => IngredientPricings,
    ingredientPricings => ingredientPricings.ingredient,
    { cascade: true }
  )
  @JoinColumn()
  pricings: IngredientPricings[]

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Ingredient }
