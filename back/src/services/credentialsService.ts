import { QueryRunner } from "typeorm"
import ICredentialsDto from "../dtos/credentialsDto"
import { Credential } from "../entities/Credentials"
import { credentialsRepository, userRepository } from "../config/data-source";



export const createCredentialsService = async (credentials: ICredentialsDto, queryRunner: QueryRunner): Promise<Credential>  => {
    const credentialsRepository = queryRunner.manager.getRepository(Credential);
    return await credentialsRepository.save(credentials)
}

export const validateCredentialsService = async (credentials: ICredentialsDto) => {
    const usernameValidate = await credentialsRepository.findOne({
        where: { username: credentials.username },
        relations: ['user']  // Cargamos la relación con el User.
    })
    if (!usernameValidate) {return false}
    // Verificamos que la contraseña coincida.
    if (usernameValidate.password !== credentials.password) { return false }  // Contraseña incorrecta.
    
    const user = usernameValidate.user  //usuario asociado.
    return user
}

export const checkCredentialsService = async (username: string, queryRunner: QueryRunner): Promise<boolean> => {
    const credentialsRepository = queryRunner.manager.getRepository(Credential);
    const checkUsername = await credentialsRepository.findOneBy({username: username})
    return !!checkUsername;
}