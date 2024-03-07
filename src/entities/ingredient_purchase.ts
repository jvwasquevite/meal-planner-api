import { Entity, ManyToOne, PrimaryColumn } from "typeorm"
import { v4 as uuid } from "uuid"
import { Purchase } from "./purchase"
import { Ingredient } from "./ingredient"

@Entity("ingredient_purchase")
class IngredientPurchase {
  @PrimaryColumn()
  readonly id: string

  @ManyToOne(type => Ingredient, ingredient => ingredient.purchases)
  ingredient: Ingredient

  @ManyToOne(type => Purchase, purchase => purchase.ingredients)
  purchase: Purchase

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { IngredientPurchase }
