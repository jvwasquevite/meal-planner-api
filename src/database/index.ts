import { DataSource } from "typeorm"

export const Database = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "97128005",
  database: "meal_planner",
  entities: ["src/entities/*.ts"],
  logging: true,
  synchronize: true,
})
