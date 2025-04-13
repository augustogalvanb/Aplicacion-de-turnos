# Aplicación de Gestión de Turnos (ADT)

![Banner](https://via.placeholder.com/800x200.png?text=Aplicación+de+Turnos) <!-- Opcional: agregar una captura -->

**ADT** (Aplicación de Turnos) es una aplicación web full-stack diseñada para gestionar turnos de manera eficiente. Permite a los usuarios registrarse, iniciar sesión, subir fotos de perfil, agendar y cancelar turnos, con confirmaciones automáticas por correo electrónico. Este proyecto fue desarrollado como una demostración de habilidades en desarrollo web, integrando un frontend interactivo con React y un backend robusto con Node.js, Express y TypeORM.

---

## Características principales

- **Autenticación de usuarios**: Registro e inicio de sesión seguro con username y password.
- **Gestión de perfil**: Subida de fotos de perfil con almacenamiento en Cloudinary y visualización dinámica en el navbar.
- **Gestión de turnos**: Creación y cancelación de turnos con validación de usuario.
- **Notificaciones por email**: Confirmaciones automáticas enviadas al correo del usuario al agendar o cancelar un turno.
- **Interfaz responsiva**: Diseño limpio y funcional con navegación intuitiva.
- **Persistencia de datos**: Base de datos PostgreSQL manejada con TypeORM.

---

## Tecnologías utilizadas

### Frontend
- **React**: Biblioteca para construir interfaces de usuario dinámicas.
- **React Router**: Navegación entre vistas (login, config, appointments).
- **React Icons**: Íconos personalizados (ej. `<FaUser />`).
- **CSS Modules**: Estilos modulares y encapsulados.
- **js-cookie**: Manejo de cookies para autenticación y datos de usuario.

### Backend
- **Node.js**: Entorno de ejecución para el servidor.
- **Express**: Framework para crear la API REST.
- **TypeORM**: ORM para interactuar con la base de datos PostgreSQL.
- **Cloudinary**: Servicio de almacenamiento de imágenes en la nube.
- **Nodemailer**: Envío de correos electrónicos.
- **PostgreSQL**: Base de datos relacional.

### Herramientas
- **Git**: Control de versiones.
- **npm**: Gestión de dependencias.
- **dotenv**: Manejo de variables de entorno.

---

## Requisitos previos

Para ejecutar este proyecto, necesitarás:
- **Node.js** (>= 16.x)
- **npm** (>= 8.x)
- **PostgreSQL** (instalado y configurado)
- Una cuenta en **Cloudinary** (para subir imágenes)
- Una cuenta de Gmail y una contraseña de aplicación (para enviar correos)

---

## Instrucciones de instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/adt.git
cd adt
```

### 2. Configurar el backend
```bash
1. Navegá al directorio del backend:
cd back

2. Instalá las dependencias:
npm install

3. Creá un archivo .env en back/ con las siguientes variables:

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=tu_usuario_postgres
DB_PASSWORD=tu_contraseña_postgres
DB_NAME=adt_db
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
EMAIL_USER=tuemail@gmail.com
EMAIL_PASS=tu_contraseña_de_aplicacion

4. Configurá la base de datos PostgreSQL:
- Creá una base de datos llamada adt_db.
- Las tablas se generarán automáticamente con TypeORM al iniciar el servidor.

5. Iniciá el backend:
npm start

El servidor correrá en http://localhost:3000
```
### 3. Configurar el frontend
```bash
1. Abrí una nueva terminal y navegá al directorio del frontend:
cd front

2. Instalá las dependencias:
npm install

3. Iniciá el frontend:
npm run dev

La aplicación estará disponible en http://localhost:5173
```

## Uso
1. Registro e inicio de sesión:
- Visitá http://localhost:5173/login para loguearte con un username y password.
- Si no tenés cuenta, el backend debería tener un endpoint /register (pendiente de implementación pública).
2. Gestión de perfil:
- Andá a /config para subir una foto de perfil, que se mostrará en el navbar.
3. Gestión de turnos:
- En /appointments, creá un turno seleccionando fecha y hora.
- Cancelá un turno desde la lista (si implementaste una).
4. Notificaciones:
- Recibirás un correo de confirmación al agendar o cancelar un turno.