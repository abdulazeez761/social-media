"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const logger_service_1 = require("./core/lib/logger/logger.service");
const helmet_1 = require("helmet");
const nestjs_i18n_1 = require("nestjs-i18n");
const app_module_1 = require("./app.module");
const compression = require("compression");
const config_1 = require("@nestjs/config");
const bodyParser = require("body-parser");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bufferLogs: true,
    });
    const logger = app.get(logger_service_1.LoggerService);
    const configService = app.get(config_1.ConfigService);
    const prefix = configService.get('PREFIX');
    const port = +configService.get('PORT') || 3000;
    const nodeEnv = configService.get('NODE_ENV');
    app.enable('trust proxy');
    app.set('etag', 'strong');
    app.use(bodyParser.json({ limit: '10mb' }));
    app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
    app.enableCors({
        origin: configService.get('ALLOWED_HOSTS'),
        credentials: true,
        methods: 'GET,PUT,PATCH,POST,DELETE',
        maxAge: 3600,
    });
    app.setGlobalPrefix(nodeEnv + '/' + prefix);
    app.use((0, helmet_1.default)());
    app.use(compression());
    app.useGlobalPipes(new nestjs_i18n_1.I18nValidationPipe({
        forbidUnknownValues: true,
        forbidNonWhitelisted: true,
        validateCustomDecorators: true,
        whitelist: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.useGlobalFilters(new nestjs_i18n_1.I18nValidationExceptionFilter({
        detailedErrors: false,
        errorHttpStatusCode: common_1.HttpStatus.BAD_REQUEST,
    }));
    app.useLogger(logger);
    if (nodeEnv === 'prod') {
        const config = new swagger_1.DocumentBuilder()
            .setTitle('NestJS Skeleton')
            .setDescription('Starter code for lightweight to middle size projects (Backend Development: NestJS)')
            .setVersion('1.0')
            .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'JWT',
            description: 'Enter JWT token',
            in: 'header',
        }, 'JWT-auth')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config, {});
        swagger_1.SwaggerModule.setup('api', app, document);
    }
    await app.listen(port, () => {
        logger.log(`Application is running on port: ${port} 🚀 `, 'NestApplication');
    });
}
bootstrap();
//# sourceMappingURL=main.js.map