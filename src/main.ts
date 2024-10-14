import { NestFactory } from "@nestjs/core";
import { RootModule } from "./modules/root/root.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { APIResponseInterceptor } from "./common/interceptors/api-response/api-response.interceptor";
import { DefaultExceptionFilter } from "./common/filters/default-exception/default-exception.filter";
import { LoggingInterceptor } from "./common/interceptors/logging/logging.interceptor";
import environment from "../env/env";
import { ValidationPipe, VERSION_NEUTRAL, VersioningType } from "@nestjs/common";

async function bootstrap() {
    // set up the root app environment
    const env = environment(); // import the environment data structure
    const options: any = {};
    env.root?.dev ? (options.cors = true) : null; // enable CORS for dev environment
    env?.logger ? (options.logger = env.logger) : null; // set up logger levels

    // define the API versions
    const apiVersions: string[] = env.api.map((api) => api.version);
    
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
        SwaggerModule.setup(`v${api.version}/${api.path}`, app, document, { useGlobalPrefix: true, jsonDocumentUrl: api.jsonPath });
    }

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
