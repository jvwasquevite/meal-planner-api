import { Entity, PrimaryColumn, Column } from "typeorm"
import { v4 as uuid } from "uuid"

import { Ingredient } from "./ingredient"

@Entity("ingredient_measurements")
class IngredientMeasurements {
  @PrimaryColumn()
  readonly id: string

  @Column()
  max_weight: number

  @Column()
  tablespoon: number

  @Column()
  tea_cup: number

  @Column()
  cup: number

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { IngredientMeasurements }
