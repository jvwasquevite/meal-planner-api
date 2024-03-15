import { Database } from "../database"
import { Ingredient } from "../entities/ingredient"
import { MealPlan } from "../entities/mealplan"

type listMealPlanIngredientsRequest = {
  mealplan_id: string
}

export class listMealPlanIngredientsUseCase {
  async execute({ mealplan_id }: listMealPlanIngredientsRequest) {
    const repo = Database.getRepository(MealPlan)
    const ingredientRepo = Database.getRepository(Ingredient)

    const mealPlan = await repo
      .createQueryBuilder("mealplan")
      .leftJoinAndSelect("mealplan.recipes", "mealplanRecipe")
      .leftJoinAndSelect("mealplanRecipe.recipe", "recipe")
      .leftJoinAndSelect("recipe.ingredients", "ingredients")
      .leftJoinAndSelect("ingredients.ingredient", "ingredient")
      .leftJoinAndSelect("ingredient.units", "units")
      .leftJoinAndSelect("ingredient.pricings", "pricings")
      .where("mealplan.id = :id", { id: mealplan_id })
      .getOne()

    const mealPlanIngredients = []

    const numberToCurrency = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    })

    mealPlan.recipes.forEach(mealPlanRecipe => {
      mealPlanRecipe.recipe.ingredients.forEach(recipeIngredient => {
        const existingIngredient = mealPlanIngredients.find(
          ingredient => ingredient.id === recipeIngredient.ingredient.id
        )

        if (!existingIngredient) {
          mealPlanIngredients.push({
            id: recipeIngredient.ingredient.id,
            name: recipeIngredient.ingredient.name,
            quantity: null,
            previst_cost: null,
            pricings: {
              minimum: numberToCurrency
                .format(recipeIngredient.ingredient.pricings.minimum)
                .replace(/\s/, ""),
              maximum: numberToCurrency
                .format(recipeIngredient.ingredient.pricings.maximum)
                .replace(/\s/, ""),
              average: numberToCurrency
                .format(recipeIngredient.ingredient.pricings.average)
                .replace(/\s/, ""),
            },
          })
        }
      })
    })

    const mealPlanIngredientsQuantity = []

    mealPlan.recipes.forEach(mealPlanRecipe => {
      mealPlanRecipe.recipe.ingredients.forEach(recipeIngredient => {
        const existingIngredient = mealPlanIngredientsQuantity.find(
          ingredient => ingredient.id === recipeIngredient.ingredient.id
        )

        if (!existingIngredient) {
          mealPlanIngredientsQuantity.push({
            id: recipeIngredient.ingredient.id,
            quantity: recipeIngredient.converted_quantity,
          })
        } else {
          existingIngredient.quantity += recipeIngredient.converted_quantity
        }
      })
    })

    for (let mealPlanIngredient of mealPlanIngredients) {
      const ingredient = await ingredientRepo.findOne({
        where: { id: mealPlanIngredient.id },
        relations: ["pricings", "units"],
      })

      const consumption_units = {
        "Peso sólido": "g",
        "Peso líquido": "ml",
        Unidade: mealPlanIngredient.quantity > 1 ? " unidades" : " unidade",
        Fatia: mealPlanIngredient.quantity > 1 ? " fatias" : " fatia",
      }

      const quantity = await mealPlanIngredientsQuantity.find(
        ingredient => ingredient.id === mealPlanIngredient.id
      ).quantity

      mealPlanIngredient.quantity =
        quantity + consumption_units[ingredient.units.consumption_unit]

      mealPlanIngredient.previst_cost = numberToCurrency
        .format(
          Math.ceil(quantity / ingredient.units.quantity_per_sales_unit) *
            ingredient.pricings.average
        )
        .replace(/\s/, "")
    }

    return mealPlanIngredients
  }
}
