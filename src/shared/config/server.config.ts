import { INestExpressApplication, INestApplication } from '@nestjs/common';

export const configServer = (server: INestApplication & INestExpressApplication) => {
  server.setGlobalPrefix('/api');
};
