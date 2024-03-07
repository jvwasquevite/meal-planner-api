import { Entity, Column, PrimaryColumn, OneToOne } from "typeorm"
import { v4 as uuid } from "uuid"
import { Ingredient } from "./ingredient"

@Entity("ingredient_pricings")
class IngredientPricings {
  @PrimaryColumn()
  readonly id: string

  @OneToOne(type => Ingredient, ingredient => ingredient.pricings)
  ingredient: Ingredient

  @Column({ type: "numeric" })
  minimum: number

  @Column({ type: "numeric" })
  maximum: number

  @Column({ type: "numeric" })
  average: number

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { IngredientPricings }
