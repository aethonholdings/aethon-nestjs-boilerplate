import { NestFactory } from "@nestjs/core";
import { RootModule } from "./modules/root/root.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { APIDataResponseInterceptor } from "./common/interceptors/api-data-response.interceptor";
import environment from "../env/env";

async function bootstrap() {
    
    // set up the root app environment
    const env = environment(); // import the environment data structure
    const options: any = {};
    (env.root?.dev) ? options.cors = true : null; // enable CORS for dev environment
    (env.root?.logger) ? options.logger = env.root.logger : null; // set up logger levels

    // create the app
    const app = await NestFactory.create(RootModule, options);

    // set up Swagger
    const config = new DocumentBuilder()
        .setTitle("Aethon NestJS boilerplate")
        .setDescription("The Aethon NestJS boilerplate API description")
        .setVersion(env.api.version)
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document, { useGlobalPrefix: true, jsonDocumentUrl: "json" });

    // set up global interceptors
    app.useGlobalInterceptors(new APIDataResponseInterceptor());

    // start the server
    await app.listen(env.root.port);
}
bootstrap();
