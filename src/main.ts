import { NestFactory } from "@nestjs/core";
import { RootModule } from "./modules/root/root.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import environment from "../env/env";

async function bootstrap() {
    // create the root module
    // enable CORS for dev environment
    const env = environment();
    const options: any = env.dev ? { cors: true } : {};
    const app = await NestFactory.create(RootModule, options);

    // set up Swagger
    const config = new DocumentBuilder()
        .setTitle("Aethon NestJS boilerplate")
        .setDescription("The Aethon NestJS boilerplate API description")
        .setVersion(env.api.version)
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document, { useGlobalPrefix: true, jsonDocumentUrl: "json" });

    // start the server
    await app.listen(env.port);
}
bootstrap();
