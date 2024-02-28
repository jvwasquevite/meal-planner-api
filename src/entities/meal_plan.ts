import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm"
import { v4 as uuid } from "uuid"
import { Weekday } from "./weekday"

@Entity("meal_plan")
class MealPlan {
  @PrimaryColumn()
  readonly id: string

  @Column()
  name: string

  @OneToMany(type => Weekday, weekday => weekday.meal_plan, { cascade: true })
  weekdays: Weekday[]

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { MealPlan }
