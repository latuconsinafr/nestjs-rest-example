import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MiddlewaresModule } from './middlewares/middlewares.module';
import { UsersModule } from './users/users.module';
import pino from 'pino';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      useFactory: async () => {
        return {
          pinoHttp: {
            name: 'Personal Practice',
            level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
            transport:
              process.env.NODE_ENV !== 'production'
                ? { target: 'pino-pretty' }
                : undefined,
            // * There is a possibility of the most recently buffered log messages being lost in case of a system failure, e.g. a power cut.
            stream: pino.destination({
              // * Omit for stdout
              dest: './app.log',
              // * Buffer before writing
              minLength: 4096,
              // * Asynchronous logging
              sync: false,
            }),
          },
        };
      },
    }),
    MiddlewaresModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
