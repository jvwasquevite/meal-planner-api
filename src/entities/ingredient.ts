import { Entity, PrimaryColumn, Column, OneToOne } from "typeorm"
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

  @OneToOne(() => IngredientUnits)
  units_id: IngredientUnits

  @OneToOne(() => IngredientMeasurements)
  measurements_id: IngredientMeasurements

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Ingredient }
