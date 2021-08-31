# Avalith Skill Factory - Fullstack Movie App

Deberá crear una API donde el usuario pueda loguearse utilizando su email y su password, y al ser exitoso deberá devolver un token que quedará persistido en el Frontend.

### Información para Login:
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

### Variables de Entorno para Cliente
```
REACT_APP_API_ROUTE='http://localhost:3001'
REACT_APP_JWT_SECRET='maradona1982376234%$#&'
ESLINT_NO_DEV_ERRORS=true
```


### Servidor (Node.js Express, Bcrypt, JSON Web Token y PostgreSQL)
Se conecta a la base de datos: **avalith**
```
/config (configuración de base de datos, creación de tablas y usuarios)
/controllers (funciones controladoras)
/routes (configuración de rutas)
```

### Variables de Entorno para Servidor
```
PORT=3001
PGUSER='postgres'
PGHOST='localhost'
PGDATABASE='avalith'
PGPASSWORD=''
PGPORT='5432'
JWT_SECRET='maradona1982376234%$#&'
```

### Instalación
```
git clone https://github.com/EzequielCaste/avalith-fullstack-ezequiel-castellanos.git
cd avalith-fullstack-ezequiel-castellanos/server
npm install

abrir otra terminal en avalith-fullstack-ezequiel-castellanos/client
npm install
```

### Iniciar el Servidor
```
cd avalith-fullstack-ezequiel-castellanos/server
node index.js
```

### Iniciar el Cliente
```
cd avalith-fullstack-ezequiel-castellanos/client
npm start
```

### Abrir http://localhost:3000/

![image](https://user-images.githubusercontent.com/51804994/131553715-a0590836-9aa6-4d72-aa31-0b537dc2d5d3.png)



