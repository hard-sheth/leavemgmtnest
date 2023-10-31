import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import {
  MicroserviceOptions,
  RpcException,
  Transport,
} from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'productEmployeeBook',
        protoPath: `${__dirname}/proto/productBook.proto`,
        url: `0.0.0.0:${process.env.PORT}`,
      },
    },
  );
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        console.log(validationErrors);
        return new RpcException({
          code: 3,
          message: 'Validation failed',
          details: validationErrors.map((error) => ({
            field: error.property,
            error: Object.values(error.constraints).join(', '),
          })),
        });
      },
    }),
  );
  console.log(`Server is running on PORT:${process.env.PORT}`);
  await app.listen();
}
bootstrap();
