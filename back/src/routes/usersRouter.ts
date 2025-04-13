import { Router } from "express"
import { register, login, uploadPhoto } from "../controllers/usersController";
import multer from 'multer';
import path from "path";
import fs from 'fs'
// Crear la carpeta uploads si no existe
const uploadDir = path.join(__dirname, '../..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configuración de multer para guardar archivos temporalmente
const storage = multer.diskStorage({
    destination: (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
      cb(null, 'uploads/'); // Carpeta temporal en el servidor
    },
    filename: (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  const upload = multer({ storage });

const userRouter: Router = Router()

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/uploadPhoto/:id", upload.single('photo'), uploadPhoto);
export default userRouter