"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
require('dotenv').config();
console.log(process.env.ZERO_BOUNCE);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    await app.listen(3000);
}
bootstrap();
console.log(process.env.REAL_VALIDATION);
//# sourceMappingURL=main.js.map