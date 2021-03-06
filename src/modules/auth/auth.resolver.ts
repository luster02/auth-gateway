import { Resolver, Args, Mutation } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { AuthResult, MutationResult } from './interfaces'
import { SigninDto, SignupDto } from './dto'
import { User } from '../user/user.schema'

@Resolver(of => User)
export class AuthResolver {
    constructor(private readonly _authService: AuthService) { }

    @Mutation(returns => MutationResult)
    async signup(@Args('userData') userData: SignupDto): Promise<MutationResult> {
        await this._authService.signup(userData)
        return { success: true }
    }

    @Mutation(returns => AuthResult)
    async signin(@Args('userData') userData: SigninDto): Promise<AuthResult> {
        const token = await this._authService.signin(userData)
        return { token, success: true }
    }
}