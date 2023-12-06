import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyWebSocketGateway } from './websocket.gateway';
import { GraphqlModule } from './graphql/graphql.module';

@Module({
  imports: [GraphqlModule],
  controllers: [AppController ],
  providers: [MyWebSocketGateway, AppService,],
})
export class AppModule {}
