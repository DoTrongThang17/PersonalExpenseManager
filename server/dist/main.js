"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: true,
    });
    app.enableCors({
        origin: true,
        credentials: true,
    });
    app.use((0, cookie_parser_1.default)());
    app.use((0, express_session_1.default)({
        secret: 'my-secret-key',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60 * 60 * 1000,
        },
    }));
    const port = process.env.PORT ?? 5000;
    await app.listen(port);
    console.log(`✅ Application is running on: http://localhost:${port}`);
}
bootstrap().catch((err) => {
    console.error('❌ Failed to start application:', err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map