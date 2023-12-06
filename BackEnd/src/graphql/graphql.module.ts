import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PongResolver } from '../app.resolver';


@Module(
{
    imports: [
        GraphQLModule.forRoot({
        //   autoSchemaFile: true, // This will generate the schema automatically
        }),
      ],
      providers: [PongResolver],
})
export class GraphqlModule {}
