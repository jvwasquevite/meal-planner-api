import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { v4 as uuid } from "uuid"

import { MealPlan } from "./meal_plan"
import { MealBlock } from "./meal_block"

@Entity("weekday")
class Weekday {
  @PrimaryColumn()
  readonly id: string

  @Column()
  name: string

  @ManyToOne(type => MealPlan, mealPlan => mealPlan.weekdays)
  meal_plan: MealPlan

  @OneToMany(type => MealBlock, mealBlock => mealBlock.weekday, {
    cascade: true,
  })
  meal_blocks: MealBlock[]

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Weekday }
