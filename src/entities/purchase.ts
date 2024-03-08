import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm"
import { v4 as uuid } from "uuid"
import { IngredientPurchase } from "./ingredient_purchase"

@Entity("purchase")
class Purchase {
  @PrimaryColumn()
  readonly id: string

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  date: Date

  @Column({ type: "numeric", nullable: true })
  total_spent: number

  @OneToMany(
    type => IngredientPurchase,
    ingredentPurchase => ingredentPurchase.purchase,
    { cascade: true }
  )
  ingredients: IngredientPurchase[]

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Purchase }
