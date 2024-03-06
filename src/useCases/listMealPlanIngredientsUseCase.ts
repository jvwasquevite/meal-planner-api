import { Database } from "../database"
import { MealPlan } from "../entities/mealplan"

type listMealPlanIngredientsRequest = {
  mealplan_id: string
}

export class listMealPlanIngredientsUseCase {
  async execute({ mealplan_id }: listMealPlanIngredientsRequest) {
    const repo = Database.getRepository(MealPlan)

    const mealPlan = await repo
      .createQueryBuilder("mealplan")
      .leftJoinAndSelect("mealplan.recipes", "mealplanRecipe")
      .leftJoinAndSelect("mealplanRecipe.recipe", "recipe")
      .leftJoinAndSelect("recipe.ingredients", "ingredients")
      .leftJoinAndSelect("ingredients.ingredient", "ingredient")
      .leftJoinAndSelect("ingredient.units", "units")
      .where("mealplan.id = :id", { id: mealplan_id })
      .getOne()

    const mealPlanIngredients = []

    mealPlan.recipes.forEach(mealPlanRecipe => {
      mealPlanRecipe.recipe.ingredients.forEach(async recipeIngredient => {
        const existingIngredient = mealPlanIngredients.find(
          ingredient => ingredient.id === recipeIngredient.ingredient.id
        )

        if (!existingIngredient) {
          mealPlanIngredients.push({
            id: recipeIngredient.ingredient.id,
            name: recipeIngredient.ingredient.name,
            consumption_unit:
              recipeIngredient.ingredient.units.consumption_unit,
            quantity: recipeIngredient.converted_quantity,
          })
        } else {
          existingIngredient.quantity += recipeIngredient.converted_quantity
        }

        mealPlanIngredients.forEach(
          async ingredient =>
            (ingredient["formatted_quantity"] = await this.format_quantity(
              ingredient.quantity,
              ingredient.consumption_unit
            ))
        )
      })
    })

    return mealPlanIngredients
  }

  format_quantity(quantity, consumption_unit) {
    const consumption_units = {
      "Peso sólido": "g",
      "Peso líquido": "ml",
      Unidade: quantity > 1 ? " unidades" : " unidade",
      Fatia: quantity > 1 ? " fatias" : " fatia",
    }

    return quantity + consumption_units[consumption_unit]
  }
}
