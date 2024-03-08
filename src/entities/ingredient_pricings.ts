import { Entity, Column, PrimaryColumn } from "typeorm"
import { v4 as uuid } from "uuid"
@Entity("ingredient_pricings")
class IngredientPricings {
  @PrimaryColumn()
  readonly id: string

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
