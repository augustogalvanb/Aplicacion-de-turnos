import cloudinary from "../config/cloudinary.config"
import { AppDataSource, userRepository } from "../config/data-source"
import ICredentialsDto from "../dtos/credentialsDto"
import IRegisterDto from "../dtos/registerDto"
import { Credential } from "../entities/Credentials"
import { User } from "../entities/User"
import { checkCredentialsService, createCredentialsService, validateCredentialsService } from "./credentialsService"


export const registerService = async (userData: IRegisterDto) => {
        const queryRunner = AppDataSource.createQueryRunner();
    try {
        // Conectar el QueryRunner a la base de datos
        await queryRunner.connect();

        // Iniciar la transacción
        await queryRunner.startTransaction();

        //Verificar si el username ya existe
        const checkUsername = await checkCredentialsService(userData.username, queryRunner)
        if (checkUsername) {
            throw new Error('El username ya está en uso')
        } 
        // Crear las credenciales
        const credentials = new Credential();
        credentials.username = userData.username;
        credentials.password = userData.password;
        const newCredentials = await createCredentialsService(credentials, queryRunner)
        // Crear el usuario y asociarlo con las credenciales
        // const userRepository = queryRunner.manager.getRepository(User);
        const user = new User();
        user.name = userData.name;
        user.email = userData.email;
        user.birthdate = userData.birthdate;
        user.nDni = userData.nDni;
        user.credentials = credentials;
        const newUser = await queryRunner.manager.save(user);
    
        newCredentials.user = newUser
        await queryRunner.manager.save(newCredentials)

        // 4. Confirmar la transacción si todo salió bien
        await queryRunner.commitTransaction();
        return newUser
    } catch (error) {
        // 5. Hacer rollback si algo falla
        await queryRunner.rollbackTransaction();
        // Usar una aserción de tipo para decir que el error es de tipo Error
        const err = error as Error;
        // Propagar el error con un mensaje específico
        if (err.message === 'El username ya está en uso') {
        throw new Error("El usuario ya existe");
      }
      throw new Error("No se ha podido crear el usuario"); // Error genérico para otros casos
    } finally {
        // 6. Liberar el QueryRunner
        await queryRunner.release();
    }
}

export const loginService = async (credentials: ICredentialsDto): Promise<false | User> => {
    const login = await validateCredentialsService(credentials)
    return login
}

export const uploadPhotoService = async (photoFile: Express.Multer.File, userId: number): Promise<string> => {
    try {
        // Subir la imagen a Cloudinary
        const uploadResult = await cloudinary.uploader.upload(photoFile.path, {
          public_id: `profile_${Date.now()}`, // Nombre único basado en timestamp
          folder: 'profile_photos', // Carpeta en Cloudinary
          overwrite: true, // Sobrescribir si existe
        });
    
        // Devolver la URL segura de la imagen
        await userRepository.update(
          { id: userId }, // Criterio: actualizar el usuario con este ID
          { imgUrl: uploadResult.secure_url } // Campo a actualizar
        )
        return uploadResult.secure_url;
      } catch (error) {
        console.error('Error uploading photo to Cloudinary:', error);
        throw error; // Propagamos el error al controlador
      }
}

// export const updateUser = async (userData) => {

// }