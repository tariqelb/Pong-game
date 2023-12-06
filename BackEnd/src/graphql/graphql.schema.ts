import { Field, Float,  Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class recieveBallData
{

    @Field(() => Float)
    ballX : number;
   
    @Field(() => Float)
    ballY : number;

    @Field(() => Boolean, { nullable: true })
    ballDirection?: boolean;
    
    @Field(() => Float)
    ballSpeed: number;

    @Field(() => Boolean)
    goalRestart: boolean;

    @Field(() => Float)
    ballAngle : number;

    @Field(() => Float)
    leftPlayerGoal : number;

    @Field(() => Float)
    rightPlayerGoal : number;
}


@ObjectType()
export class recieveRacketData 
{
    @Field(() => Float)
    height : number;

    @Field(() => Float)
    width : number;

    @Field(() => Float)
    lastPosY : number;
}

@ObjectType()
export class sentRacketData
{
    @Field(() => Float)
    height : number;

    @Field(() => Float)
    width : number;

    @Field(() => Float)
    lastPosY : number;
}

@ObjectType()
export class sentRobotRacket
{
    @Field(() => Float)
    height : number;

    @Field(() => Float)
    width : number;

    @Field(() => Float)
    lastPosY : number;

    @Field(() => Float)
    robotLastPosY : number;
}

@ObjectType()
export class Goals
{
    @Field(() => Int)
    leftPlayerGoals: number; 
    
    @Field(() => Int)
    rightPlayerGoals : number;

    @Field(() => Int)
    playerNumber: number;
}

@ObjectType()
export class playerNumber
{
  @Field(() => Int)
  playerNumber: number;
}
