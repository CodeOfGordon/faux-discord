import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';

dotenv.config();


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Set up EJS as the view engine
  app.setViewEngine('ejs');
  // Set the directory where the EJS templates are stored
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // Serve static assets from the 'public' directory
  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.use(cookieParser());
  
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
