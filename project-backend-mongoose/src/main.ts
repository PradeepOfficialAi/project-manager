import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log("The Graphql Running: http://localhost:3000/graphql");
  console.log("Nestjs running: http://localhost:3000");
}
bootstrap();
