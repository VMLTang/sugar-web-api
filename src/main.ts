import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configServer } from './shared/config/server.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configServer(app);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
