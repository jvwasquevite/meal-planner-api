import { Entity, PrimaryColumn, Column, OneToOne } from "typeorm"
import { v4 as uuid } from "uuid"

@Entity("recipe")
class Recipe {
  @PrimaryColumn()
  readonly id: string

  @Column()
  name: string

  @Column()
  servings: number

  @Column()
  hours: number

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Recipe }
