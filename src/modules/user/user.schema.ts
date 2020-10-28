import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
    @Field({ nullable: true })
    _id: string

    @Field({ nullable: true })
    username: string;

    @Field({ nullable: true })
    email: string;

    @Field({ nullable: true })
    createdAt: string

    @Field({ nullable: true })
    updatedAt: string
}