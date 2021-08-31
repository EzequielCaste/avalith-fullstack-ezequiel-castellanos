# Avalith Skill Factory - Fullstack Movie App

Deberá crear una API donde el usuario pueda loguearse utilizando su email y su password, y al ser exitoso deberá devolver un token que quedará persistido en el Frontend.

Información para Login:
```
usuario test
{
"email": "test@test.com",
"password": "123"
}

usuario admin
{
"email": "admin@test.com",
"password": "123"
}

```

### Cliente (React.js React Router y JSON Web Token)

```
/src
  - /components
  - /context
  - /hooks
  - /router
MovieApp.js
```

### Servidor (Node.js Express, Bcrypt, JSON Web Token y PostgreSQL)
Se conecta a la base de datos: **avalith**
```
/config (configuración de base de datos, creación de tablas y usuarios)
/controllers (funciones controladoras)
/routes (configuración de rutas)

```

### Instalación
```
git clone https://github.com/EzequielCaste/avalith-fullstack-ezequiel-castellanos.git
cd avalith-fullstack-ezequiel-castellanos
cd server
npm install
cd..
cd client
npm install
```
