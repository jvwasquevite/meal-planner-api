import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm"
import { v4 as uuid } from "uuid"

import { Weekday } from "./weekday"
import { Recipe } from "./recipe"

@Entity("meal_block")
class MealBlock {
  @PrimaryColumn()
  readonly id: string

  @Column()
  name: string

  @ManyToOne(type => Weekday, weekday => weekday.meal_blocks)
  weekday: Weekday

  @ManyToMany(type => Recipe)
  @JoinTable()
  recipes: Recipe[]

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { MealBlock }
