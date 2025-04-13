import { Request, RequestHandler, Response } from "express"
import { loginService, registerService, uploadPhotoService } from "../services/usersService";

export const register = async (req: Request, res: Response) => {
    const dataUser = req.body
    try {
        const user = await registerService(dataUser)
        const userResponse = {
            id: user.id,
            name: user.name,
            email: user.email,
            birthdate: user.birthdate,
            nDni: user.nDni,
            username: user.credentials.username
        };
        res.status(200).json({
            message: 'usuario creado con éxito',
            user: userResponse
        })
    } catch (error: any) {
        res.status(400).json({
            message: 'no se ha podido crear el usuario',
            error: error.message
        })
    }
}

export const login = async (req: Request, res: Response) => {
    const credentials = req.body
    try {
        const login = await loginService(credentials)
        if(login) {
            res.status(200).json({
                message: 'usuario logueado con éxito',
                login: login
            })
        } else {
            res.status(200).json({
                message: 'credenciales inválidas',
            })
        }
        
    } catch (error) {
        res.status(400).json({
            message: 'no se ha podido iniciar sesión',
            error: error
        })
    }
}

// Definimos un tipo para req que incluye multer
interface MulterRequest extends Request {
    file?: Express.Multer.File; // file es opcional porque podría no estar presente
}

export const uploadPhoto: RequestHandler = async (req: MulterRequest, res: Response) => {
    const userId = req.params.id
    
    try {
        // Verificar si hay un archivo en la solicitud
        if (!req.file) {
            res.status(400).json({ message: 'No photo file provided' });
            return
        }
    
        // Pasar el archivo al servicio
        const photoUrl = await uploadPhotoService(req.file, Number(userId));
        console.log('Photo uploaded to Cloudinary:', photoUrl);
        // Responder con el enlace de la foto subida
        res.status(200).json({
          message: 'Photo uploaded successfully',
          photoUrl,
        });
      } catch (error: any) {
        console.error('Error in uploadPhoto controller:', error);
        res.status(500).json({
          message: 'Failed to upload photo',
          error: error.message,
        });
      }
}

