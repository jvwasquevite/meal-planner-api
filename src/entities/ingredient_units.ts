import { Entity, PrimaryColumn, Column } from "typeorm"
import { v4 as uuid } from "uuid"

@Entity("ingredient_units")
class IngredientUnits {
  @PrimaryColumn()
  readonly id: string

  @Column()
  consumption_unit: string

  @Column()
  sales_unit: string

  @Column()
  quantity_per_sales_unit: number

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { IngredientUnits }
