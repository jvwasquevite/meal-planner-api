import { Entity, PrimaryColumn, Column, NumericType, ManyToOne } from "typeorm"
import { v4 as uuid } from "uuid"

import { Ingredient } from "./ingredient"

@Entity("ingredient_pricing")
class IngredientPricing {
  @PrimaryColumn()
  readonly id: string

  @ManyToOne(() => Ingredient)
  ingredient_id: Ingredient

  @Column()
  date: Date

  @Column()
  price: number

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { IngredientPricing }
