import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm"
import { v4 as uuid } from "uuid"
import { Recipe } from "./recipe"
import { MealPlan } from "./mealplan"

enum Weekdays {
  Segunda = "Segunda",
  Terça = "Terça",
  Quarta = "Quarta",
  Quinta = "Quinta",
  Sexta = "Sexta",
  Sábado = "Sábado",
  Domingo = "Domingo",
}

@Entity("mealplan_recipe")
class MealPlanRecipe {
  @PrimaryColumn()
  readonly id: string

  @Column({ type: "enum", enum: Weekdays })
  weekday: Weekdays

  @Column()
  mealblock: string

  @ManyToOne(type => Recipe, recipe => recipe.mealplans)
  recipe: Recipe

  @ManyToOne(type => MealPlan, mealPlan => mealPlan.recipes)
  mealplan: MealPlan

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { MealPlanRecipe }
