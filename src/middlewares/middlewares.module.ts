import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [],
  exports: [],
})
export class MiddlewaresModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(csrfMiddleware).forRoutes('*');
  }
}
