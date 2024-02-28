import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { v4 as uuid } from "uuid"

import { Ingredient } from "./ingredient"

@Entity("ingredient_pricing")
class IngredientPricing {
  @PrimaryColumn()
  readonly id: string

  @Column()
  ingredient_id: string

  @JoinColumn({ name: "ingredient_id" })
  @ManyToOne(type => Ingredient, ingredient => ingredient.pricings)
  ingredient: Ingredient

  @Column()
  date: Date

  @Column({ type: "real" })
  price: number

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { IngredientPricing }
