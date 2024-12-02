---

# **Prueba Técnica - Gestión de Clientes**

Este proyecto implementa un sistema de gestión de clientes desarrollado como una prueba técnica. Incluye un backend construido con **NestJS**, un frontend con **Nuxt 3** y una base de datos **PostgreSQL** desplegados en contenedores Docker.

---

## **Tecnologías Utilizadas**
### **Backend**
- **NestJS**: Framework para construir aplicaciones backend robustas.
- **Prisma ORM**: Interacción con la base de datos.
- **Node.js**: Entorno de ejecución.
  
### **Frontend**
- **Nuxt 3**: Framework de Vue.js para la interfaz de usuario.
- **Tailwind CSS**: Framework CSS para diseño responsivo y estilizado.

### **Base de Datos**
- **PostgreSQL**: Base de datos relacional para almacenamiento persistente.

### **Infraestructura**
- **Docker**: Para la contenedorización de los servicios.
- **Docker Compose**: Para la orquestación de los contenedores.

---

## **Características**
1. **Gestión de Clientes**:
   - Registro de nuevos clientes con validación de datos.
   - Actualización de clientes con restricciones (correo único, validación de contraseñas).
   - Eliminación y visualización de clientes.

2. **Validaciones Avanzadas**:
   - Contraseñas con requisitos específicos (longitud, símbolos, letras mayúsculas/minúsculas).
   - Prevenir duplicados en correos electrónicos.

3. **Interfaz de Usuario Moderna**:
   - Diseño responsivo inspirado en interfaces profesionales.
   - Retroalimentación visual y validaciones en tiempo real.

4. **Despliegue en Contenedores**:
   - Servicios backend, frontend y base de datos ejecutados en contenedores Docker.

---

## **Ejecución del Proyecto**

### **Requisitos Previos**
- Docker y Docker Compose instalados.
- Node.js y npm (para desarrollo local).

### **Configuración**

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/GabrielGM16/prueba-gestion-clientes.git
   cd prueba-gestion-clientes
   ```

2. Iniciar los contenedores:
   ```bash
   docker-compose up --build
   ```

3. Acceso a la aplicación:
   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **Backend**: [http://localhost:5000](http://localhost:5000)

---

## **Estructura del Proyecto**

```plaintext
prueba_tecnica/
├── backend-prueba/   # Código del backend (NestJS, Prisma)
│   ├── src/          # Controladores, servicios, DTOs
│   ├── prisma/       # Archivos de esquema de Prisma
│   └── Dockerfile    # Configuración del contenedor backend
├── front-prueba/     # Código del frontend (Nuxt 3, Tailwind)
│   ├── components/   # Componentes reutilizables
│   ├── pages/        # Páginas principales
│   └── Dockerfile    # Configuración del contenedor frontend
├── docker-compose.yml # Orquestación de los servicios
└── README.md          # Documentación del proyecto
```

---

## **Pruebas**
### **Frontend**
- Validaciones en tiempo real al interactuar con formularios.
- Diseño responsivo probado en navegadores modernos.

### **Backend**
- Rutas probadas con **Postman**:
  - **POST** `/customers`: Crear cliente.
  - **GET** `/customers`: Obtener todos los clientes.
  - **PUT** `/customers/:id`: Actualizar cliente.
  - **DELETE** `/customers/:id`: Eliminar cliente.

### **Base de Datos**
- Validación de migraciones con Prisma.
- Restricciones aplicadas para garantizar la unicidad de correos electrónicos.

---

## **Notas Adicionales**
- Este proyecto fue desarrollado con un enfoque en buenas prácticas y código limpio.
- Se utilizaron migraciones automáticas para la creación de la base de datos.
- Para futuras iteraciones, se puede añadir autenticación y autorización.

---

## **Autor**
**Martin Gabriel Godinez Morales**  
_Técnico en Desarrollo de Software Multiplataforma_  
[GitHub](https://github.com/GabrielGM16)

---
