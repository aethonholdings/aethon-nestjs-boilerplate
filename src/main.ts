import { NestFactory } from "@nestjs/core";
import { RootModule } from "./modules/root/root.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { APIResponseInterceptor } from "./common/interceptors/api-response/api-response.interceptor";
import { DefaultExceptionFilter } from "./common/filters/default-exception/default-exception.filter";
import { LoggingInterceptor } from "./common/interceptors/logging/logging.interceptor";
import environment from "../env/env";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
    // set up the root app environment
    const env = environment(); // import the environment data structure
    const options: any = {};
    env.root?.dev ? (options.cors = true) : null; // enable CORS for dev environment
    env?.logger ? (options.logger = env.logger) : null; // set up logger levels

    // create the app
    const app = await NestFactory.create(RootModule, options);

    // set up Swagger
    const config = new DocumentBuilder()
        .setTitle(env.api.title)
        .setDescription(env.api.description)
        .setVersion(env.api.version)
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(env.api.path, app, document, { useGlobalPrefix: true, jsonDocumentUrl: env.api.jsonPath });

    // set up exception filters
    app.useGlobalFilters(new DefaultExceptionFilter());

    // set up global interceptors
    app.useGlobalInterceptors(new APIResponseInterceptor());
    app.useGlobalInterceptors(new LoggingInterceptor());

    // attach the validation pipe
    app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: !env.root.dev }));

    // start the server
    await app.listen(env.root.port);
}
bootstrap();
