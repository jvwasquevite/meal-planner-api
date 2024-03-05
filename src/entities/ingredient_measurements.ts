import { Entity, PrimaryColumn, Column, OneToOne } from "typeorm"
import { v4 as uuid } from "uuid"
import { Ingredient } from "./ingredient"

@Entity("ingredient_measurements")
class IngredientMeasurements {
  @PrimaryColumn()
  readonly id: string

  @OneToOne(type => Ingredient, ingredient => ingredient.measurements)
  ingredient: Ingredient

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
