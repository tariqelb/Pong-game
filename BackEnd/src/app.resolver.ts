import { Resolver, Subscription } from '@nestjs/graphql';
import { recieveBallData, sentRacketData, sentRobotRacket, Goals, playerNumber } from './graphql/graphql.schema'; // Import your types


@Resolver()
export class PongResolver {
 
    //
}