import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserService } from './user.service'
import { User } from './user.schema'
import { IJwtPayload } from '../auth/interfaces'
import { GqlAuthGuard } from '../auth/guards/graphql.guard'
import { CurrentUser } from '../auth/decorators/user.decorator'

@Resolver(of => User)
@UseGuards(GqlAuthGuard)
export class UserResolver {
    constructor(private _userService: UserService) { }

    @Query(returns => User)
    async getUser(
        @Args('id', { type: () => Int }) id: number
    ): Promise<User> {
        return this._userService.get(id)
    }

    @Query(returns => User)
    async getCurentUser(
        @CurrentUser() user: IJwtPayload
    ): Promise<User> {
        return this._userService.get(user.id)
    }
}