import { NestFactory } from "@nestjs/core";
import { RootModule } from "./modules/root/root.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { APIRequestInterceptor } from "./common/interceptors/api-request/api-request.interceptor";
import environment from "../env/env";
import { ValidationPipe, VERSION_NEUTRAL, VersioningType } from "@nestjs/common";
import { DefaultExceptionFilter } from "./common/filters/default-exception/default-exception.filter";

async function bootstrap() {
    // set up the root app environment
    const env = environment(); // import the environment data structure
    const options: any = {};
    env.root?.dev ? (options.cors = true) : null; // enable CORS for dev environment
    env?.logger ? (options.logger = env.logger) : null; // set up logger levels
  
    // create the app
    const app = await NestFactory.create(RootModule, options);

    // set a global prefix
    app.setGlobalPrefix(env.root.prefix);

    // add api versioning
    app.enableVersioning({ type: VersioningType.URI, defaultVersion: VERSION_NEUTRAL });

    // set up Swagger - make configuarable based on API version
    for (const api of env.api) {
        const config = new DocumentBuilder()
            .setTitle(api.title)
            .setDescription(api.description)
            .setVersion(api.version)
            .build();
        const document = SwaggerModule.createDocument(app, config);
        // example swagger path will be /api/v0.1/swagger
        SwaggerModule.setup(`v${api.version}/${api.path}`, app, document, { useGlobalPrefix: true, jsonDocumentUrl: api.jsonPath });
    }

    // set up exception filters
    app.useGlobalFilters(new DefaultExceptionFilter());

    // set up global interceptors
    app.useGlobalInterceptors(new APIRequestInterceptor());

    // attach the validation pipe
    app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: !env.root.dev }));

    // start the server
    await app.listen(env.root.port);
}
bootstrap();
