import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);	
  app.enableCors({
	origin: env.CORS_ORIGIN,
	credentials: true,
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });
  await app.listen(3000);
}
bootstrap();
