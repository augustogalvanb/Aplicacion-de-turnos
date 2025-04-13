import { DataSource } from "typeorm"
import { DATABASE, PASSWORD, USER_NAME } from "./envs"
import { User } from "../entities/User"
import { Credential } from "../entities/Credentials"
import { Appointment } from "../entities/Appointment"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: USER_NAME,
    password: PASSWORD,
    database: DATABASE,
    dropSchema: false,
    synchronize: false,
    logging: false,
    entities: [User, Credential, Appointment],
    subscribers: [],
    migrations: [],
})

export const userRepository = AppDataSource.getRepository(User)
export const credentialsRepository = AppDataSource.getRepository(Credential)
export const appointmentRepository = AppDataSource.getRepository(Appointment)