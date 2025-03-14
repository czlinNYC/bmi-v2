import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config();
console.log(process.env.ZERO_BOUNCE);
async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	await app.listen(3000);
}
bootstrap();
console.log(process.env.REAL_VALIDATION);
