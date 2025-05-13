# RealEstate Backend - NestJS

Este es el backend del proyecto RealEstate desarrollado con [NestJS](https://nestjs.com/). Gestiona usuarios, autenticación con Firebase y almacenamiento en PostgreSQL utilizando TypeORM.

## 🚀 Tecnologías utilizadas

- NestJS
- TypeORM
- PostgreSQL
- Firebase Admin SDK
- JWT
- Class Validator / Transformer
- Dotenv
- Eslint + Prettier

## 📦 Instalación

```bash
npm install
npm install @nestjs/typeorm typeorm pg
npm install firebase-admin
npm install @nestjs/config
npm install class-validator class-transformer
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install @nestjs/jwt passport-jwt bcrypt
npm install -D @types/bcrypt
npm install passport-custom

```

### Para desarrollo

```bash
npm install -D @types/passport-jwt
```

## 🛠 Scripts útiles

```bash
# Levantar el servidor en desarrollo
npm run start:dev

# Compilar el proyecto
npm run build

# Ejecutar en producción
npm run start:prod

# Lint del proyecto
npm run lint

# Formatear con Prettier
npm run format

```

## 🧪 Estructura del proyecto

```bash
src/
├── auth/
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── guards/
│   └── strategies/
├── config/
│   ├── database.config.ts
│   └── firebase.config.ts
├── users/
│   ├── user.entity.ts
│   ├── user.service.ts
│   └── user.controller.ts
├── app.module.ts
├── main.ts


```
