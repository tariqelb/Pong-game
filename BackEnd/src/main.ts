import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { join } from 'path';
import { IoAdapter } from '@nestjs/platform-socket.io'; 
import { MyWebSocketGateway } from './websocket.gateway';
import { logger } from './connection-logger.middleware';
import { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() 
{
  //const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: true, // Replace with your React app's URL
    methods: 'GET,POST,DELETE',
    credentials: true,
  });


  // Register the connection logger middleware
  app.use(logger);
 
  app.useStaticAssets(join(__dirname, '..', 'static'));
  //app.useWebSocketAdapter(new IoAdapter(app));
  //app.use

  let port : string = '4055';
  let IPV4 = "0.0.0.0";
  await app.listen(port , IPV4,  () => console.log(`Listening on port ${port}`));
}
bootstrap();



//import cors from '@fastify/cors';
//import { ConnectionLoggerMiddleware } from './connection-logger.middleware'; // Import the middleware
//app.register(cors, { origin: true, credentials: true, methods: 'GET,POST'});
/*
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Replace with your React app's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.useStaticAssets(join(__dirname, '..', 'static'));
  await app.listen(3011);
}
bootstrap();*/