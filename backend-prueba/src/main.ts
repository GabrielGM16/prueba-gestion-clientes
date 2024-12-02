import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  // Crear la aplicación
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para permitir solicitudes desde otros dominios
  app.enableCors();

  // Usar un ValidationPipe para aplicar validaciones globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no definidas en DTOs
      forbidNonWhitelisted: true, // Rechaza solicitudes con propiedades desconocidas
      transform: true, // Convierte tipos automáticamente
    }),
  );

  // Configurar Swagger para la documentación de la API
  const config = new DocumentBuilder()
    .setTitle('Customer API')
    .setDescription('API to manage customers')
    .setVersion('1.0')
    .addTag('customers') // Agrega etiquetas de agrupación
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT ?? 5000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
