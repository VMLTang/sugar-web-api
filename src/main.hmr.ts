import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';
import { configServer } from 'shared/config/server.config';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configServer(app);
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
