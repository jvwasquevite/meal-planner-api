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

  @OneToOne(type => IngredientMeasurements, {
    cascade: true,
  })
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

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Ingredient }
