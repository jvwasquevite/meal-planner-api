import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { v4 as uuid } from "uuid"

import { IngredientUnits } from "./ingredient_units"
import { IngredientMeasurements } from "./ingredient_measurements"

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

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Ingredient }
