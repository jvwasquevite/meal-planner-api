import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm"
import { v4 as uuid } from "uuid"
import { MealPlanRecipe } from "./mealplan_recipe"

@Entity("mealplan")
class MealPlan {
  @PrimaryColumn()
  readonly id: string

  @Column()
  name: string

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  created_at: Date

  @OneToMany(
    type => MealPlanRecipe,
    mealplanRecipe => mealplanRecipe.mealplan,
    { cascade: true }
  )
  recipes: MealPlanRecipe[]

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { MealPlan }
