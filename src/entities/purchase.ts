import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { v4 as uuid } from "uuid"
import { Ingredient } from "./ingredient"
import { IngredientPurchase } from "./ingredient_purchase"

@Entity("purchase")
class Purchase {
  @PrimaryColumn()
  readonly id: string

  @Column()
  date: Date

  @Column({ type: "numeric" })
  total_spent: number

  @OneToMany(
    type => IngredientPurchase,
    ingredentPurchase => ingredentPurchase.purchase,
    { cascade: true }
  )
  ingredients: Ingredient[]

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Purchase }
